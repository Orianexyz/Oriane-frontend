import React, { useState } from "react";
import Header from "@/components/header/Header";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/sidebar/Sidebar";
import { useNavItems } from "@/router/nav";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navItems = useNavItems();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="flex flex-col justify-between gap-10 h-full">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="pt-14 flex flex-col gap-2">
                {navItems.map(
                  (item, i) =>
                    item.visible &&
                    item.protected && (
                      <SidebarLink
                        data-testid={"sidebarLink_" + i}
                        key={item.href + i}
                        link={item}
                      />
                    )
                )}
              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
