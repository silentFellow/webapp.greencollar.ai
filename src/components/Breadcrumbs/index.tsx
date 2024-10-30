import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Breadcrumbs = ({ path }: { path: Record<string, string> }) => {
  const pathKeys = Object.keys(path);

  return (
    <Breadcrumb className="focus:outline-none">
      <BreadcrumbList className="text-lg">
        {pathKeys.map((key, index) => {
          const isLast = index === pathKeys.length - 1;
          const value = path[key];

          if (isLast) {
            return <BreadcrumbPage key={value}>{key}</BreadcrumbPage>;
          } else {
            return (
              <section key={value}>
                <BreadcrumbLink className="focus:outline-none" href={value}>
                  {key}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </section>
            );
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
