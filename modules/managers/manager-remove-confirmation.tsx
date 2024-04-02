import { RiCloseLine, RiDeleteBinLine } from "@remixicon/react";
import { Badge, TextInput, Dialog, DialogPanel } from "@tremor/react";
import { useState } from "react";

export function ManagerRemoveConfirmaation() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-gray-400 hover:text-gray-900 transition">
        <RiDeleteBinLine className="w-4 h-4" />
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} static={true} className="z-[100]">
        <DialogPanel className="sm:max-w-md">
          <div className="absolute right-0 top-0 pr-3 pt-3">
            <button
              type="button"
              className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <RiCloseLine className="h-5 w-5 shrink-0" aria-hidden={true} />
            </button>
          </div>
          <form>
            <h4 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Delete user
            </h4>
            <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
              All user data will be permanently deleted.
            </p>
            <label
              htmlFor="delete-workspace"
              className="mt-6 block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Type <Badge>steven</Badge> to confirm
            </label>
            <TextInput id="delete-workspace" name="delete-workspace" placeholder="" className="mt-2" />
            <button
              type="submit"
              className="mt-4 w-full whitespace-nowrap rounded-tremor-default bg-red-500 px-4 py-2 text-center text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-red-600 dark:bg-red-500 dark:text-tremor-brand-inverted dark:shadow-dark-tremor-input hover:dark:bg-red-600"
            >
              Delete user permanently
            </button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
