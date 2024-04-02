import { Info } from "@/components/info";
import { StafList } from "@/modules/staf/staf-list";
import { Button, Divider, Text, TextInput } from "@tremor/react";
import React from "react";

const info = {
  title: "Invite new users",
  description: "Staf Kementerian can manage companies and carbon trading.",
};

export default function StaffPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Staff Management</h1>
      <Text className="mt-0.5">Manage Staf Kementerian accounts.</Text>

      <div className="mt-8">
        <Info {...info} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mt-4 grid gap-3 sm:gap-2 sm:flex">
            <TextInput
              id="username"
              name="username"
              placeholder="Username (optional)"
              className="w-full sm:w-fit rounded-tremor-small"
            />
            <div className="flex gap-2 w-full">
              <TextInput
                type="email"
                id="email"
                name="email"
                placeholder="Add email..."
                className="w-full rounded-tremor-small sm:max-w-xs"
                required
              />
              <Button type="submit" className="rounded-tremor-small">
                Invite
              </Button>
            </div>
          </div>
        </form>
      </div>

      <Divider className="mt-8" />

      <div className="mt-8">
        <Info title="Existing users" />

        <StafList />
      </div>
    </main>
  );
}

StaffPage.title = "Staff Management | Carbon Chain";
