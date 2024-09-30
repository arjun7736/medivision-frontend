import { useEffect, useState } from "react";

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
import { useParams } from "react-router-dom";

const ViewBill = () => {
  const headerPercentage: number = 4;

  const [billData, setBillData] = useState<Bill>();
  const { id } = useParams();
  const getBillData = async () => {
    await axios
      .get(`/bill/get-bill/${id}`)
      .then((data) => {
        setBillData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBillData();
  }, []);
  const totalGst = ((billData?.totalPercentage ?? 0) + 2000) * 18 / 100;
  return (
    <>
      <p className="text-lg md:text-xl text-center m-3 font-bold">
        MEDIVISION INSURANCE SOLUTIONS PVT LTD
      </p>
      <div className="max-w-7xl mx-auto p-4 bg-black shadow-lg text-white rounded-xl m-2">
        <div className="mb-4">
          <p className="font-semibold text-sm md:text-base">Bill To:</p>
          <p className="text-sm md:text-base">
            Name: {billData?.hospital[0]?.name}
          </p>
          <p className="text-sm md:text-base">
            Place: {billData?.hospital[0]?.place}
          </p>
          <p className="text-sm md:text-base">
            District: {billData?.hospital[0]?.district}
          </p>
        </div>
        <div>
          <p className="text-center">Service Charge Description</p>

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
              {billData?.data?.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.id}</TableCell>
                  <TableCell>
                    <Input
                      className="text-white"
                      value={data.description}
                      readOnly
                    />
                  </TableCell>
                  <TableCell>
                    <Input value={data?.amount?.toString()} readOnly />
                  </TableCell>
                  <TableCell>
                    <Input value={data?.percentage?.toString()} readOnly />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="text-center">
                <TableCell>Total</TableCell>
                <TableCell> </TableCell>
                <TableCell>{billData?.totalAmount?.toFixed(2)}</TableCell>
                <TableCell>{billData?.totalPercentage?.toFixed(2)}</TableCell>
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
                <TableCell>{billData?.totalPercentage?.toFixed(2)}</TableCell>
                <TableCell>18</TableCell>
                <TableCell>{billData?.totalPercentage?.toFixed(2)}</TableCell>
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
            Total Taxable Amount: ₹{`  ${((billData?.totalPercentage ?? 0) + 2000)?.toFixed(2)}`}
          </p>
          <p className="text-sm sm:text-base">SGST: ₹ {totalGst.toFixed(2)}</p>
          <p className="text-sm sm:text-base">CGST: ₹ {totalGst.toFixed(2)}</p>
          <p className="text-sm sm:text-base font-bold">
            Net Payable Amount: ₹{" "}
            {billData?.netPay?.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <Button>Print</Button>
          <Button>Download</Button>
        </div>
      </div>
    </>
  );
};export default ViewBill;

interface Bill {
  accoundNo: number;
  address: string;
  bankDetails: string;
  branch: string;
  cinNo: number;
  createdAt: Date;
  currency: string;
  data: [
    {
      amount: number;
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
      name: string;
      place: string;
      _id: string;
    }
  ];
  ifscCode: number;
  invoiceNo: number;
  name: string;
  paymentType: string;
  totalAmount: number;
  totalPercentage: number;
  netPay:number
  _id: string;
}
