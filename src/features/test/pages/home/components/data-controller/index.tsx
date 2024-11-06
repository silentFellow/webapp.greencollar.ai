import { Button } from "@/components/ui/button";
import { LuFilter } from "react-icons/lu";
import { FaCaretDown } from "react-icons/fa";
import { IoRefresh } from "react-icons/io5";
import { FaCaretUp } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useObject } from "@/hooks";
import { useTableStore } from "@/features/test/pages/home/zustand";
import { TbSortDescending, TbSortAscending } from "react-icons/tb";
import { useQueryClient } from "@tanstack/react-query";

const TestTableDataController = () => {
  const [flow, setFlow] = useObject({
    columnDropdown: false,
    sortDropdown: false,
  });

  const { query, setQuery, columns, toggleColumns } = useTableStore();
  const value = query.sort_by_asc || query.sort_by_desc;
  const sortOrder = query.sort_by_asc ? "sort_by_asc" : "sort_by_desc";

  // handle refetch
  const queryClient = useQueryClient();
  const handleRefetch = () => {
    queryClient.invalidateQueries({ queryKey: ["scans"], refetchType: "all" });
  };

  return (
    <section className="mt-3 full end gap-5 max-sm:grid max-sm:grid-cols-2">
      <DropdownMenu
        open={flow.sortDropdown}
        onOpenChange={() => setFlow("sortDropdown", prev => !prev)}
      >
        <div className="flex">
          <DropdownMenuTrigger asChild className="no-focus max-sm:w-full">
            <Button variant="outline" className="gap-2 rounded-r-none capitalize">
              {value?.toString().split("_").join(" ") || "Sort By"}
            </Button>
          </DropdownMenuTrigger>
          <Button
            variant="outline"
            className="center rounded-l-none border-border border-l"
            onClick={() => {
              if (!query.sort_by_asc && !query.sort_by_desc) return;

              if (query.sort_by_asc) {
                setQuery({ ...query, sort_by_desc: value, sort_by_asc: null });
              } else {
                setQuery({ ...query, sort_by_asc: value, sort_by_desc: null });
              }
            }}
          >
            {sortOrder === "sort_by_asc" ? (
              <TbSortAscending color="#038140 " />
            ) : (
              <TbSortDescending color="#038140" />
            )}
          </Button>
        </div>

        <DropdownMenuContent className="w-fit col">
          <DropdownMenuCheckboxItem
            checked={value === "scan_date"}
            onCheckedChange={() => {
              setQuery({ ...query, [sortOrder]: "scan_date" });
            }}
          >
            Scan Date
          </DropdownMenuCheckboxItem>

          <DropdownMenuCheckboxItem
            checked={value === "taram_id"}
            onCheckedChange={() => {
              setQuery({ ...query, [sortOrder]: "taram_id" });
            }}
          >
            Taram Id
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu
        open={flow.columnDropdown}
        onOpenChange={() => setFlow("columnDropdown", prev => !prev)}
      >
        <DropdownMenuTrigger asChild className="no-focus max-sm:w-full">
          <Button variant="outline" className="gap-2">
            Select columns
            <span>{flow.columnDropdown ? <FaCaretUp /> : <FaCaretDown />}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          {columns.map(column => (
            <DropdownMenuCheckboxItem
              key={column.key}
              checked={column.visible}
              onCheckedChange={() => toggleColumns(column.key)}
            >
              {column.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button className="flex gap-3">
        <LuFilter />
        <span className="md:hidden">Filter</span>
      </Button>

      <Button onClick={handleRefetch}>
        <IoRefresh />
        <span className="sm:hidden">Refetch</span>
      </Button>
    </section>
  );
};

export default TestTableDataController;
