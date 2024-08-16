import { Navdash } from "./Navdash";
import Problemtable  from "./Problemtable.jsx"
export const Problempage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <Navdash />
      </div>
      <div className="flex-grow overflow-auto">
        <Problemtable />
      </div>
    </div>
  );
};
export default Problempage;
