import { useAppDispatch } from "@/app/redux/hook";
import { setWorkspaceId } from "@/app/redux/slice/formController.slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectWorkspace = ({ listWorkspace = [] }: any) => {
  const dispatch = useAppDispatch();

  const changeWorkspace = (e: any) => {
    dispatch(setWorkspaceId(e));
  };

  return (
    <Select onValueChange={changeWorkspace}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a workspace" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {listWorkspace.length > 0 &&
            listWorkspace.map((workspace: any) => (
              <SelectItem
                key={workspace.workspace_id}
                value={workspace.workspace_id}
              >
                {workspace.workspace_name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectWorkspace;
