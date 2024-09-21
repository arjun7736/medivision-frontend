import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
interface Bill {
  id: number;
  name: string;
  place: string;
  district: string;
}
const Bill = () => {
  const [rows, setRows] = useState([
    { id: 1, detail: 'New Charge', amount: 0, percentage: 0 },
    { id: 2, detail: 'New Charge', amount: 0, percentage: 0 }
  ]);

  const addRow = () => {
    const newRow = { id: rows.length + 1, detail: 'New Charge', amount: 0, percentage: 0 };
    setRows([...rows, newRow]);
  };



  const bills: Bill[] = [
    {
      id: 1,
      name: "JEEVODAYA MISSION HOSPITAL",
      place: "BANGALORE",
      district: "chennai",
    },
    {
      id: 2,
      name: " HOSPITAL",
      place: "coorg",
      district: "kochi",
    },
    {
      id: 3,
      name: "JEEVODAYA ",
      place: "chennai",
      district: "banglore",
    },
  ];
  const [Hospital, setHospital] = useState<Bill>(bills[0]);
  return (
    <>
      <p className="text-lg md:text-xl text-center m-3 font-bold">
        MEDIVISION INSURANCE SOLUTIONS PVT LTD
      </p>
      <div className="max-w-7xl mx-auto p-4 bg-black shadow-lg text-white rounded-xl m-2">
        <div className=" mb-6">
          <select
            className="bg-black"
            onChange={(e) => setHospital(bills[parseInt(e.target.value) - 1])}
          >
            {bills.map((bill) => (
              <option value={bill.id}>{bill.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <p className="font-semibold text-sm md:text-base">Bill To:</p>
          <p className="text-sm md:text-base">Name: {Hospital?.name}</p>
          <p className="text-sm md:text-base">Place: {Hospital?.place}</p>
          <p className="text-sm md:text-base">District: {Hospital?.district}</p>
        </div>
        <div>
          <div className="flex  items-end justify-end">
            <p className="w-1/2">Service Charge Description</p>
          <Button className="mb-2" onClick={addRow}>Add a Row</Button>
          </div>
          <Table>
            <TableHeader className=" bg-white/35 text-center">
              <TableRow>
                <TableHead className="text-white">S.No</TableHead>
                <TableHead className="text-white">Details</TableHead>
                <TableHead className="text-white">amound</TableHead>
                <TableHead className="text-white">Percentage %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
               {rows.map((data) => (
                 <TableRow key={data.id}>
                   <TableCell>{data.id}</TableCell>
                   <TableCell><Input placeholder={data.detail}/></TableCell>
                   <TableCell><Input placeholder={data.percentage.toString()} type="number"/></TableCell>
                   <TableCell><Input placeholder={data.amount.toString()} type="number"/></TableCell>
                 </TableRow>
               ))}
            
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell> </TableCell>
                <TableCell>129565</TableCell>
                <TableCell>182</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        <div className="mt-10">
          <Table>
            <TableHeader className="bg-white/35 w-full">
              <TableRow>
                <TableHead className="text-white">S.No</TableHead>
                <TableHead className="text-white">
                  Description of Goods
                </TableHead>
                <TableHead className="text-white">HSN/SAC Code</TableHead>
                <TableHead className="text-white">QTY</TableHead>
                <TableHead className="text-white">Unit Price</TableHead>
                <TableHead className="text-white">GST %</TableHead>
                <TableHead className="text-white">Taxable Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Cunsultation Charge</TableCell>
                <TableCell>9987</TableCell>
                <TableCell>1</TableCell>
                <TableCell>5182.60</TableCell>
                <TableCell>18</TableCell>
                <TableCell>5182.60</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>service Charge</TableCell>
                <TableCell>927</TableCell>
                <TableCell>1</TableCell>
                <TableCell>512.60</TableCell>
                <TableCell>8</TableCell>
                <TableCell>512.60</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total Taxable amound </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell>129565</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {/* Totals Section */}
        <div className="text-right mb-4">
          <p className="text-sm sm:text-base">Total Taxable Amount: ₹7182.60</p>
          <p className="text-sm sm:text-base">SGST: ₹646.43</p>
          <p className="text-sm sm:text-base">CGST: ₹646.43</p>
          <p className="text-sm sm:text-base font-bold">
            Net Payable Amount: ₹8475.28
          </p>
        </div>
      </div>
    </>
  );
};

export default Bill;
