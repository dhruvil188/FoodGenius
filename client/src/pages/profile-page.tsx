import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { UserActivity } from '@shared/schema';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  User, 
  CreditCard, 
  ImageIcon, 
  MessageSquare,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Activity
} from 'lucide-react';

// Activity type to emoji/icon mapping
const activityTypeIcons: Record<string, React.ReactNode> = {
  'image_analysis': <ImageIcon className="h-4 w-4 mr-1" />,
  'chat_message': <MessageSquare className="h-4 w-4 mr-1" />,
  'generate_recipe': <BookOpen className="h-4 w-4 mr-1" />,
  'save_recipe': <BookOpen className="h-4 w-4 mr-1" />,
  'delete_recipe': <BookOpen className="h-4 w-4 mr-1" />,
  'purchase_credits': <CreditCard className="h-4 w-4 mr-1" />,
  'session_payment': <CreditCard className="h-4 w-4 mr-1" />,
  'webhook_payment': <CreditCard className="h-4 w-4 mr-1" />,
};

// Activity type labels for better display
const activityTypeLabels: Record<string, string> = {
  'image_analysis': 'Image Analysis',
  'chat_message': 'Chat Message',
  'generate_recipe': 'Recipe Generation',
  'save_recipe': 'Recipe Saved',
  'delete_recipe': 'Recipe Deleted',
  'purchase_credits': 'Credits Purchased',
  'session_payment': 'Payment Completed',
  'webhook_payment': 'Payment Processed',
};

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ProfilePage() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const pageSize = 10;

  // Fetch user activities
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['/api/user/activities', page, pageSize],
    queryFn: async () => {
      const res = await fetch(`/api/user/activities?limit=${pageSize}&offset=${page * pageSize}`);
      if (!res.ok) {
        throw new Error('Failed to fetch activities');
      }
      return res.json();
    },
    enabled: !!user,
  });

  const activities = data?.activities || [];
  const stats = data?.stats || {
    totalCreditsUsed: 0,
    imageAnalysisCount: 0,
    chatMessageCount: 0,
    savedRecipeCount: 0
  };

  // Prepare data for the charts
  const pieData = [
    { name: 'Image Analysis', value: stats.imageAnalysisCount },
    { name: 'Chat Messages', value: stats.chatMessageCount },
    { name: 'Saved Recipes', value: stats.savedRecipeCount },
  ].filter(item => item.value > 0);

  const barData = [
    { name: 'Images', count: stats.imageAnalysisCount },
    { name: 'Messages', count: stats.chatMessageCount },
    { name: 'Recipes', count: stats.savedRecipeCount },
  ];

  // Format the activity details for display
  const formatActivityDetails = (activity: UserActivity): string => {
    if (!activity.details) return 'No details available';
    
    // Parse the details if they're stored as a string
    const details = typeof activity.details === 'string' 
      ? JSON.parse(activity.details) 
      : activity.details;
    
    if (activity.activityType === 'image_analysis') {
      return `Analyzed image for ${details.foodName || 'unknown food'}`;
    } else if (activity.activityType === 'chat_message') {
      return `Chat message (${details.messageLength || 0} chars)`;
    } else if (activity.activityType === 'generate_recipe') {
      return `Generated recipe for ${details.foodName || details.prompt || 'food'}`;
    } else if (activity.activityType === 'save_recipe') {
      return `Saved recipe: ${details.recipeName || 'Unnamed recipe'}`;
    } else if (activity.activityType === 'delete_recipe') {
      return `Deleted recipe: ${details.recipeName || 'Unnamed recipe'}`;
    } else if (activity.activityType === 'purchase_credits' || 
               activity.activityType === 'session_payment' || 
               activity.activityType === 'webhook_payment') {
      return `Added ${details.creditsAdded || 0} credits (total: ${details.totalCredits || 0})`;
    }
    
    return 'Activity details not available';
  };

  // Format datetime for display
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return 'Invalid date';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please log in to view your profile.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User Profile */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={user.profileImage || ''} alt={user.displayName || user.username} />
              <AvatarFallback>{user.displayName?.charAt(0) || user.username?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.displayName || user.username}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Credits</span>
                  <span className="text-sm font-medium">{user.credits || 0}</span>
                </div>
                <Progress value={(user.credits || 0) > 0 ? 100 : 0} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">Subscription</span>
                  <span className="font-medium capitalize">{user.subscriptionTier || 'Free'}</span>
                </div>
                <div className="flex flex-col p-3 bg-muted rounded-lg">
                  <span className="text-xs text-muted-foreground">Status</span>
                  <span className="font-medium capitalize">{user.subscriptionStatus || 'Active'}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-semibold mb-2">Activity Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">Image Analyses</span>
                    </div>
                    <Badge variant="outline">{stats.imageAnalysisCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="text-sm">Chat Messages</span>
                    </div>
                    <Badge variant="outline">{stats.chatMessageCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span className="text-sm">Saved Recipes</span>
                    </div>
                    <Badge variant="outline">{stats.savedRecipeCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span className="text-sm">Credits Used</span>
                    </div>
                    <Badge variant="outline">{stats.totalCreditsUsed}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Overview */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>
              Your recent app usage and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table">
              <TabsList className="mb-4">
                <TabsTrigger value="table">Activity Log</TabsTrigger>
                <TabsTrigger value="charts">Usage Charts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table" className="space-y-4">
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ) : error ? (
                  <div className="text-center py-4 text-destructive">
                    Failed to load activity data
                  </div>
                ) : activities.length === 0 ? (
                  <div className="text-center py-8">
                    <ClipboardList className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Activity Yet</h3>
                    <p className="text-muted-foreground">
                      Start using the app to track your activity
                    </p>
                  </div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Activity</TableHead>
                          <TableHead>Details</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Credits</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activities.map((activity: UserActivity) => (
                          <TableRow key={activity.id}>
                            <TableCell>
                              <div className="flex items-center">
                                {activityTypeIcons[activity.activityType] || <Activity className="h-4 w-4 mr-1" />}
                                <span>{activityTypeLabels[activity.activityType] || activity.activityType}</span>
                              </div>
                            </TableCell>
                            <TableCell>{formatActivityDetails(activity)}</TableCell>
                            <TableCell>{formatDate(activity.createdAt.toString())}</TableCell>
                            <TableCell className="text-right">
                              {(activity.creditsCost || 0) > 0 ? (
                                <Badge variant="destructive">-{activity.creditsCost}</Badge>
                              ) : activity.activityType.includes('payment') ? (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  {`+${
                                    activity.details && 
                                    typeof activity.details === 'object' && 
                                    'creditsAdded' in activity.details && 
                                    activity.details.creditsAdded !== undefined 
                                      ? activity.details.creditsAdded 
                                      : '?'
                                  }`}
                                </Badge>
                              ) : (
                                <span>—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="flex items-center justify-center mt-4 space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPage(p => Math.max(0, p - 1))}
                        disabled={page === 0}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPage(p => p + 1)}
                        disabled={activities.length < pageSize}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="charts">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-64 w-full" />
                  </div>
                ) : pieData.length === 0 ? (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No Activity Data</h3>
                    <p className="text-muted-foreground">
                      Start using the app to generate activity charts
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Activity Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [value, 'Count']} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Activity Counts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value) => [value, 'Count']} />
                              <Bar dataKey="count" fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}