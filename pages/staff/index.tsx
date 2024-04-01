import { StafList } from "@/modules/staf/staf-list";
import { Button, Divider, Metric, Text, TextInput, Title } from "@tremor/react";
import React from "react";

export default function StaffPage() {
  return (
    <main>
      <h1 className="text-tremor-title font-semibold">Staff Management</h1>
      <Text className="mt-0.5">Manage Staf Kementerian accounts.</Text>

      <div className="mt-8">
        <p className="font-medium">Invite new users</p>
        <Text className="mt-0.5">Staf Kementerian can manage companies and carbon trading.</Text>
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
        <p className="font-medium">Existing users</p>

        <StafList />
      </div>
    </main>
  );
}

StaffPage.title = "Staff Management | Carbon Chain";
