import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Weight = (props: { weight: any; setWeight: any }) => {
  const { weight, setWeight } = props;

  return (
    <div>
      <Label
        htmlFor="weight"
        className="block font-serif text-lg font-light leading-6 text-violet-500"
      >
        น้ำหนัก
      </Label>

      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center pl-3">
          <span className="text-violet-400 sm:text-sm">กิโลกรัม</span>
        </div>

        <Input
          type="number"
          name="weight"
          id="weight"
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-2 text-violet-400 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
          placeholder="0.00"
          aria-describedby="eight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Weight;
