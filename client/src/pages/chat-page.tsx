import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, PlusCircle, Clock, Trash2, MessageCircle, ChefHat } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

// Message interfaces
interface ChatMessage {
  id: number;
  userId: number;
  content: string;
  role: "user" | "assistant";
  conversationId: string;
  recipeOutput?: any;
  createdAt: string;
}

interface Conversation {
  id: string;
  lastMessage: ChatMessage;
}

const ChatPage: React.FC = () => {
  const { currentUser } = useAuth();
  const params = useParams();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Get all conversations
  const {
    data: conversations,
    isLoading: isLoadingConversations,
    error: conversationsError,
  } = useQuery({
    queryKey: ["/api/chat/conversations"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/chat/conversations");
      return response.json();
    },
    enabled: !!currentUser,
  });

  // Get messages for active conversation
  const {
    data: messages,
    isLoading: isLoadingMessages,
    error: messagesError,
  } = useQuery({
    queryKey: ["/api/chat/messages", activeConversationId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/chat/messages/${activeConversationId}`);
      return response.json();
    },
    enabled: !!activeConversationId && !!currentUser,
  });

  // Create a new message
  const createMessageMutation = useMutation({
    mutationFn: async ({ content, conversationId }: { content: string; conversationId?: string }) => {
      const response = await apiRequest("POST", "/api/chat/messages", {
        content,
        conversationId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // If creating a message in a new conversation, update active conversation
      if (!activeConversationId) {
        setActiveConversationId(data.conversationId);
      }
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages", data.conversationId] });
      queryClient.invalidateQueries({ queryKey: ["/api/chat/conversations"] });
    },
  });

  // Generate a recipe from prompt
  const generateRecipeMutation = useMutation({
    mutationFn: async ({ prompt, conversationId }: { prompt: string; conversationId?: string }) => {
      const response = await apiRequest("POST", "/api/chat/generate-recipe", {
        prompt,
        conversationId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Update active conversation to the one with the generated recipe
      setActiveConversationId(data.message.conversationId);
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["/api/chat/messages", data.message.conversationId] });
      queryClient.invalidateQueries({ queryKey: ["/api/chat/conversations"] });
    },
  });
  
  // Delete a conversation
  const deleteConversationMutation = useMutation({
    mutationFn: async (conversationId: string) => {
      const response = await apiRequest("DELETE", `/api/chat/conversations/${conversationId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/conversations"] });
      // If the active conversation was deleted, reset to new chat
      if (activeConversationId === deleteConversationMutation.variables) {
        setActiveConversationId(null);
        navigate("/chat", { replace: true });
      }
    },
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set active conversation from URL parameter on load
  useEffect(() => {
    if (params.id && !activeConversationId) {
      setActiveConversationId(params.id);
    }
  }, [params, activeConversationId]);

  // Update URL when active conversation changes
  useEffect(() => {
    if (activeConversationId) {
      navigate(`/chat/${activeConversationId}`, { replace: true });
    }
  }, [activeConversationId, navigate]);

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Record the prompt before clearing input
    const promptCopy = prompt;
    setPrompt("");

    // Create a new message
    await createMessageMutation.mutateAsync({
      content: promptCopy,
      conversationId: activeConversationId || undefined,
    });

    // Generate a recipe from the prompt
    await generateRecipeMutation.mutateAsync({
      prompt: promptCopy,
      conversationId: activeConversationId || undefined,
    });
  };

  // Handle starting a new conversation
  const handleNewConversation = () => {
    setActiveConversationId(null);
    setPrompt("");
    navigate("/chat", { replace: true });
  };

  // Handle switching to a conversation
  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
  };
  
  // Handle deleting a conversation
  const handleDeleteConversation = (conversationId: string) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      deleteConversationMutation.mutate(conversationId);
    }
  };

  // Format conversation title based on first message
  const getConversationTitle = (conversation: Conversation) => {
    const title = conversation.lastMessage.content;
    // Truncate title if too long
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar with conversation list */}
      <div className="w-full md:w-72 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border bg-background/95 sticky top-0 z-10">
          <Button onClick={handleNewConversation} className="w-full flex items-center gap-2" variant="default">
            <PlusCircle size={16} />
            <span>New Recipe Fusion</span>
          </Button>
        </div>
        <ScrollArea className="flex-1">
          {isLoadingConversations ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : conversationsError ? (
            <div className="p-4 text-destructive">
              Error loading conversations. Please try again.
            </div>
          ) : conversations?.length === 0 ? (
            <div className="p-6 text-muted-foreground text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <MessageCircle size={24} className="text-primary" />
              </div>
              <p className="font-medium">No recipe fusions yet</p>
              <p className="text-sm">Start a new conversation to create fusion recipes!</p>
            </div>
          ) : (
            <div className="py-2">
              {conversations?.map((conversation: Conversation) => (
                <div 
                  key={conversation.id} 
                  className={`group w-full p-3 mx-1 my-1 rounded-md hover:bg-secondary/50 transition-colors flex justify-between items-center
                    ${activeConversationId === conversation.id ? "bg-secondary" : ""}
                  `}
                >
                  <button
                    onClick={() => handleSelectConversation(conversation.id)}
                    className="flex-1 text-left flex flex-col gap-1"
                  >
                    <span className="text-sm font-medium truncate">
                      {getConversationTitle(conversation)}
                    </span>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock size={12} className="mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 ml-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all"
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col max-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Chat messages area */}
        <ScrollArea className="flex-1 p-4">
          {!activeConversationId && !isLoadingMessages ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Recipe Chat</h2>
              <p className="text-muted-foreground mb-10 max-w-md">
                Describe the dishes you'd like to combine, and I'll create a delicious fusion recipe for you.
              </p>
              <div className="max-w-md space-y-4 text-left w-full">
                <div className="text-sm p-4 rounded-lg border border-border bg-secondary/40 hover:bg-secondary/70 transition-colors cursor-pointer" 
                     onClick={() => setPrompt("Create a pasta dish that combines elements of carbonara and pad thai")}>
                  <p className="font-medium text-primary mb-1">Try this:</p>
                  <p>"Create a pasta dish that combines elements of carbonara and pad thai"</p>
                </div>
                <div className="text-sm p-4 rounded-lg border border-border bg-secondary/40 hover:bg-secondary/70 transition-colors cursor-pointer"
                     onClick={() => setPrompt("How would you combine a classic beef burger with Korean bibimbap?")}>
                  <p className="font-medium text-primary mb-1">Try this:</p>
                  <p>"How would you combine a classic beef burger with Korean bibimbap?"</p>
                </div>
                <div className="text-sm p-4 rounded-lg border border-border bg-secondary/40 hover:bg-secondary/70 transition-colors cursor-pointer"
                     onClick={() => setPrompt("Design a dessert that fuses tiramisu with mango sticky rice")}>
                  <p className="font-medium text-primary mb-1">Try this:</p>
                  <p>"Design a dessert that fuses tiramisu with mango sticky rice"</p>
                </div>
              </div>
            </div>
          ) : isLoadingMessages ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : messagesError ? (
            <div className="p-4 text-destructive">
              Error loading messages. Please try again.
            </div>
          ) : (
            <div className="space-y-6 px-2">
              {messages?.map((message: ChatMessage) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl shadow-sm ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground py-3 px-4 rounded-br-sm"
                        : "bg-secondary/80 border border-border py-3 px-4 rounded-bl-sm"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <ChefHat size={14} className="text-primary" />
                        </div>
                        <span className="text-xs font-medium">Recipe Chef</span>
                      </div>
                    )}
                    
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    
                    {/* Render recipe card if the message has a recipe output */}
                    {message.role === "assistant" && message.recipeOutput && (
                      <div className="mt-4 bg-background/40 rounded-lg p-2">
                        <RecipeCard recipe={message.recipeOutput} />
                      </div>
                    )}
                    
                    <div className="text-xs opacity-70 mt-2 text-right">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messageEndRef} className="h-4" />
            </div>
          )}
        </ScrollArea>

        {/* Input area */}
        <div className="border-t border-border p-4 bg-background/95">
          <form onSubmit={handleSendMessage} className="flex gap-3 items-end">
            <div className="relative flex-1">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe dishes to combine... (e.g., 'Create a dish that combines tacos and sushi')"
                className="flex-1 min-h-[60px] max-h-[180px] pr-10 resize-none border-primary/20 focus-visible:ring-primary/30"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                Shift + Enter for new line
              </div>
            </div>
            <Button
              type="submit"
              disabled={
                !prompt.trim() ||
                createMessageMutation.isPending ||
                generateRecipeMutation.isPending
              }
              className="h-[60px] w-[60px] rounded-full shadow-sm"
              size="icon"
            >
              {createMessageMutation.isPending || generateRecipeMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </form>
          
          {/* Credits message */}
          <div className="mt-2 text-xs text-center text-muted-foreground">
            <span className="flex items-center justify-center gap-1">
              <ChefHat size={12} className="inline-block" />
              Recipe Chef combines your suggestions to create delicious fusion recipes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;