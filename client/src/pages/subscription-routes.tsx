import { Route, Switch } from "wouter";
import SubscriptionPage from "./subscription-updated";
import SubscriptionSuccess from "./subscription-success";

export default function SubscriptionRoutes() {
  return (
    <Switch>
      <Route path="/subscription" component={SubscriptionPage} />
      <Route path="/subscription-success" component={SubscriptionSuccess} />
    </Switch>
  );
}