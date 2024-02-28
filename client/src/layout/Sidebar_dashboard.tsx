import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCurrentUser } from "../app/hooks/useUser";
import logo from "../assets/homepage/logo.png";
import BILLING_MEMBERSHIP from "../assets/sidebar/billing_membership.png";
import DASHBOARD from "../assets/sidebar/dashboard.png";
import EVENT from "../assets/sidebar/event_alerts.png";
import MESSAGES from "../assets/sidebar/message.png";
import PROPOSALS from "../assets/sidebar/proposals.png";
import SAVED_EVENTS from "../assets/sidebar/saved_events.png";

const SidebarDashboard = () => {
  const navigate = useNavigate();
  const user = useGetCurrentUser();
  const location = useLocation();

  const imageStyles = "object-scale-down w-[18px]";

  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <Card className="h-[calc(100vh-8rem)] w-full max-w-[16rem] bg-[#fff] shadow-none sm:shadow-md">
        <div className="">
          <img
            src={logo}
            alt="AV bids logo"
            className="w-[120px] object-scale-down "
          />
        </div>
        <List>
          <ListItem
            onClick={() => navigate("/dashboard")}
            className={isActive("/dashboard") ? "bg-[#8645FF]/20" : ""}
          >
            <ListItemPrefix>
              <img src={DASHBOARD} alt="Dashboard" className={imageStyles} />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          {user?.userType === "PLANNER" && (
            <ListItem
              onClick={() => navigate("/events/my-events")}
              className={isActive("/events/my-events") ? "bg-[#8645FF]/20" : ""}
            >
              <ListItemPrefix>
                <img src={EVENT} alt="My Event" className={imageStyles} />
              </ListItemPrefix>
              My Event
            </ListItem>
          )}
          <ListItem
            onClick={() => navigate("/messages")}
            className={isActive("/messages") ? "bg-[#8645FF]/20" : ""}
          >
            <ListItemPrefix>
              <img src={MESSAGES} alt="Messages" className={imageStyles} />
            </ListItemPrefix>
            Messages
          </ListItem>
          {user?.userType === "PLANNER" && (
            <ListItem
              onClick={() => navigate("/proposals")}
              className={isActive("/proposals") ? "bg-[#8645FF]/20" : ""}
            >
              <ListItemPrefix>
                <img src={PROPOSALS} alt="Proposals" className={imageStyles} />
              </ListItemPrefix>
              Proposals
            </ListItem>
          )}
          {user?.userType === "PROVIDER" && (
            <>
              <ListItem
                onClick={() => navigate("/events/alerts")}
                className={isActive("/events/alerts") ? "bg-[#8645FF]/20" : ""}
              >
                <ListItemPrefix>
                  <img src={EVENT} alt="Event Alerts" className={imageStyles} />
                </ListItemPrefix>
                Event Alerts
              </ListItem>
              <ListItem
                onClick={() => navigate("/events/saved-events")}
                className={
                  isActive("/events/saved-events") ? "bg-[#8645FF]/20" : ""
                }
              >
                <ListItemPrefix>
                  <img
                    src={SAVED_EVENTS}
                    alt="Saved Events"
                    className={imageStyles}
                  />
                </ListItemPrefix>
                Followed Events
              </ListItem>
              <ListItem
                onClick={() => navigate("/billing")}
                className={isActive("/billing") ? "bg-[#8645FF]/20" : ""}
              >
                <ListItemPrefix>
                  <img
                    src={BILLING_MEMBERSHIP}
                    alt="Billing & Membership"
                    className={imageStyles}
                  />
                </ListItemPrefix>
                Billing & Membership
              </ListItem>
            </>
          )}
        </List>
      </Card>
    </div>
  );
};

export default SidebarDashboard;
