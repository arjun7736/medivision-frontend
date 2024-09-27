import { ListFilter, PlusCircle } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";

import { Tabs, TabsContent } from "../components/ui/tabs";
import DataTable from "../components/DataTable";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "../intersepter/axiosIntersepter";
import { useEffect, useState } from "react";

const BillingPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("Daily");
  const [allBills, setAllbills] = useState<Bill[] | null>(null);
  const navigate = useNavigate();

  const getAllBills = async (filter = "Daily") => {
    setSelectedFilter(filter);
    await axios
      .get(`/bill/get-allbills/${filter}`)
      .then((data) => {
        setAllbills(data.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllBills();
  }, []);

  return (
    <>
      <div className="flex min-h-screen w-full  flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <NavBar />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="">
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-7 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={selectedFilter === "Daily"}
                        onClick={() => getAllBills("Daily")}
                      >
                        Daily
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedFilter === "Monthly"}
                        onClick={() => getAllBills("Monthly")}
                      >
                        Monthly
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={selectedFilter === "Yearly"}
                        onClick={() => getAllBills("Yearly")}
                      >
                        Yearly
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() => navigate("/bill")}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Create new Bill
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Bills</CardTitle>
                    <CardDescription>
                      Manage and view your Daily Bills.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                   {allBills?.length==0?(<>
                   <div className="text-center text-xl">
                    No Bills To Show
                   </div>
                   </>): <DataTable allBills={allBills} />}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" size={10}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" size={10} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>
        </div>
      </div>
    </>
  );
};

export default BillingPage;

interface Bill {
  _id: string;
  address: string;
  bankDetails: string;
  branch: string;
  cinNo: number;
  createdAt: Date;
  currency: string;
  data: [
    {
      amound: number;
      description: string;
      id: number;
      percentage: number;
      _id: string;
    }
  ];
  email: string;
  gstNo: number;
  hospital: [
    {
      district: string;
      id: string;
      name: string;
      place: string;
      _id: string;
    }
  ];
  ifscCode: number;
  invoiceNo: number;
  name: string;
  paymentType: string;
  totalAmound: number;
  totalPercentage: number;
}
