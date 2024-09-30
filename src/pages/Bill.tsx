import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
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
import axios from "../intersepter/axiosIntersepter";
import { toast } from "sonner";

const Bill = () => {
  const headerPercentage: number = 4;

  const [rows, setRows] = useState([
    { id: 1, description: "New Charge", amount: 0, percentage: 0 },
    { id: 2, description: "New Charge", amount: 0, percentage: 0 },
  ]);

  const addRow = () => {
    const newRow = {
      id: rows.length + 1,
      description: "New Charge",
      amount: 0,
      percentage: 0,
    };
    setRows([...rows, newRow]);
  };
  const [bills, setBills] = useState<Bill[]>([]);
  const [Hospital, setHospital] = useState<Bill>();
  interface Bill {
    _id: string;
    name: string;
    place: string;
    district: string;
  }

  const getHospitalDetails = async () => {
    await axios
      .get("/bill/get-hospitalData")
      .then((data) => {
        setBills(data.data);
        setHospital(data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getHospitalDetails();
  }, []);

  const totalAmount = rows.reduce((acc, row) => acc + row.amount, 0);
  const totalPercentage = rows.reduce((acc, row) => acc + row.percentage, 0);

  const handleInputChange = (
    id: number,
    field: keyof (typeof rows)[0],
    value: number | string
  ) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        const updatedRow = { ...row };
        if (field === "amount") {
          const newAmount = Number(value);
          const newPercentage = (headerPercentage * newAmount) / 100;
          updatedRow.amount = newAmount;
          updatedRow.percentage = newPercentage;
        } else if (field === "percentage") {
          updatedRow.percentage = Number(value);
        } else if (field === "description") {
          updatedRow.description = String(value);
        }
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };
  const totalGst = ((totalPercentage + 2000) * 18) / 100;
  const netPay = (totalPercentage + 2000 + totalGst * 2)

  const handleClick = async () => {
    const data = {
      data: [...rows],
      hospital: Hospital,
      totalAmount: totalAmount,
      totalPercentage: totalPercentage,
      netPay:netPay,
      gstAmount:totalGst
    };
    await axios
      .post("/bill/create-bill", data)
      .then(() => {
        toast.success("Bill Successfully Saved")
      })
      .catch((error) => {
        toast.error(error.response.data.error.message)
      });
  };


  return (
    <>
      <p className="text-lg md:text-xl text-center m-3 font-bold">
        MEDIVISION INSURANCE SOLUTIONS PVT LTD
      </p>
      <div className="max-w-7xl mx-auto p-4 bg-black shadow-lg text-white rounded-xl m-2">
        <div className=" mb-6">
          <select
            className="bg-black"
            onChange={(e) => {
              setHospital(bills.find((bill) => bill._id == e.target.value));
            }}
          >
            {bills.map((bill: Bill) => (
              <option key={bill._id} value={bill._id}>
                {bill.name}
              </option>
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
            <Button className="mb-2" onClick={addRow}>
              Add a Row
            </Button>
          </div>
          <Table>
            <TableHeader className=" bg-white/35">
              <TableRow className="flex-col items-center justify-center text-center">
                <TableHead className="text-white">S.No</TableHead>
                <TableHead className="text-white text-center">
                  Details
                </TableHead>
                <TableHead className="text-white text-center">amound</TableHead>
                <TableHead className="text-white text-center">
                  {headerPercentage} %
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    <Input
                      placeholder={data.description}
                      value={data.description}
                      onChange={(e) =>
                        handleInputChange(
                          data.id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder={data.amount.toString()}
                      type="number"
                      onChange={(e) =>
                        handleInputChange(data.id, "amount", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder={data.percentage.toString()}
                      type="number"
                      value={((headerPercentage * data.amount) / 100).toFixed(
                        2
                      )}
                      readOnly
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="text-center">
                <TableCell>Total</TableCell>
                <TableCell> </TableCell>
                <TableCell>{totalAmount.toFixed(2)}</TableCell>
                <TableCell>{totalPercentage.toFixed(2)}</TableCell>
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
                <TableCell>2000</TableCell>
                <TableCell>18</TableCell>
                <TableCell>2000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>service Charge</TableCell>
                <TableCell>927</TableCell>
                <TableCell>1</TableCell>
                <TableCell>{totalPercentage.toFixed(2)}</TableCell>
                <TableCell>18</TableCell>
                <TableCell>{totalPercentage.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="text-right mb-4">
          <p className="text-sm sm:text-base">
            Total Taxable Amount: ₹{`  ${(totalPercentage + 2000).toFixed(2)}`}
          </p>
          <p className="text-sm sm:text-base">SGST: ₹ {totalGst.toFixed(2)}</p>
          <p className="text-sm sm:text-base">CGST: ₹ {totalGst.toFixed(2)}</p>
          <p className="text-sm sm:text-base font-bold">
            Net Payable Amount: ₹{" "}
            {netPay.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Save Bill</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently add this
                  bill to your server
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleClick}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  );
};
export default Bill;
