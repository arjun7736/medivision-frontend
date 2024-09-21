import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "./ui/input";

const BillForm = () => {
  return (
    <>
      <div className="grid grid-flow-col gap-3 mt-3">
        <div className="w-10">
            <Input readOnly placeholder="1"/>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a Product" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select a Quandity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">1</SelectItem>
                <SelectItem value="banana">2</SelectItem>
                <SelectItem value="blueberry">3</SelectItem>
                <SelectItem value="grapes">4</SelectItem>
                <SelectItem value="pineapple">5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
            <Input placeholder="Total Amount" readOnly/>
        </div>
      </div>
    </>
  );
};

export default BillForm;
