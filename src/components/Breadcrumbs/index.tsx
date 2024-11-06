import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const Breadcrumbs = ({ path }: { path: Record<string, string> }) => {
  const pathKeys = Object.keys(path);

  return (
    <Breadcrumb className="focus:outline-none">
      <BreadcrumbList className="text-lg capitalize">
        {pathKeys.map((key, index) => {
          const isLast = index === pathKeys.length - 1;
          const value = path[key];

          if (isLast) {
            return (
              <BreadcrumbPage className="focus:outline-none" key={value}>
                {key}
              </BreadcrumbPage>
            );
          } else {
            return (
              <React.Fragment key={value}>
                <BreadcrumbLink className="focus:outline-none" href={value}>
                  {key}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
