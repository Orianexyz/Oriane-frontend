import ContentPage from "@/pages/content";
import CreatorsPage from "@/pages/creators";
import DashboardPage from "@/pages/dashboard";
import {
  IconLayoutDashboard,
  IconUsers,
  IconDatabase,
} from "@tabler/icons-react";

export const useNavItems = () => {
  return [
    {
      label: "Dashboard",
      href: "/dashboard",
      visible: true,
      protected: true,
      component: DashboardPage,
      icon: (
        <IconLayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Creators",
      href: "/creators",
      visible: true,
      protected: true,
      component: CreatorsPage,
      icon: (
        <IconUsers className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Content",
      href: "/content",
      visible: true,
      protected: true,
      component: ContentPage,
      icon: (
        <IconDatabase className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
};
