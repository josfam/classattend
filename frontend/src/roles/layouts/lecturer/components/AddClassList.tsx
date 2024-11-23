import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleCSVFileUpload } from "@/utils/files/ProcessFileContents";

const AddClassListInput = () => {
  return (
    <div className="flex h-fit w-full flex-col items-center gap-10 rounded-lg border border-slate-300 bg-slate-100 px-6 py-6 md:flex-row">
      <div className="flex-col items-center justify-center gap-1 py-4">
        <p className="text-left text-xl text-slate-700">
          There are no students yet in this class
        </p>
        <p className="text-left text-xl text-slate-700">
          Upload your students file to add them
        </p>
      </div>
      <div className="flex grow flex-col items-center gap-4 md:flex-row">
        <div className="form-item">
          <Label htmlFor="studentListUpload" className="text-lg text-slate-700">
            Students file (csv)
          </Label>
          <Input
            id="studentListUpload"
            accept=".csv"
            type="file"
            className="h-10 bg-white text-lg"
          ></Input>
        </div>
        <button
          className="btn-sec self-start text-nowrap md:self-end"
          onClick={handleCSVFileUpload}
        >
          Upload file
        </button>
      </div>
    </div>
  );
};

export default AddClassListInput;
