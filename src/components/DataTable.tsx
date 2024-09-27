import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";



const DataTable = ({ allBills }: { allBills: Bill[] | null|undefined }) => {
  const navigate = useNavigate();
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name of Organisation</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead className="hidden md:table-cell">Total Services</TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        {allBills?.map((bill: Bill) => (
          <TableBody key={bill._id}>
            <TableRow>
              <TableCell className="font-medium">
                {bill.hospital[0].name}
              </TableCell>
              <TableCell>₹ {bill.totalPercentage}</TableCell>
              <TableCell className="hidden md:table-cell">{bill.data.length}</TableCell>
              <TableCell className="hidden md:table-cell">
                {new Date(bill.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate("/bill")}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>Save As PDF</DropdownMenuItem>
                    <DropdownMenuItem>Print</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </>
  );
};

export default DataTable;


interface Bill{
  _id:string,
  address:string,
  bankDetails:string,
  branch:string,
  cinNo:number,
  createdAt:Date,
  currency:string,
  data:[{
    amound:number,
    description:string,
    id:number,
    percentage:number,
    _id:string,
  }],
  email:string,
  gstNo:number,
  hospital:[{
    district:string,
    id:string,
    name:string,
    place:string,
    _id:string
  }],
  ifscCode:number,
  invoiceNo:number,
  name:string,
  paymentType:string,
  totalAmound:number,
  totalPercentage:number,
}