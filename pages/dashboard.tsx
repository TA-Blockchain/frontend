import { RiCloseLine, RiExternalLinkLine } from "@remixicon/react";
import { Card } from "@tremor/react";

export default function HomePage() {
  return (
    <Card className="bg-white">
      <div className="absolute right-0 top-0 pr-3 pt-3">
        <button
          type="button"
          className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
          aria-label="Close"
        >
          <RiCloseLine className="h-5 w-5 shrink-0" aria-hidden={true} />
        </button>
      </div>
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Welcome to your workspace
      </h3>
      <p className="mt-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
        Start with our step-by-step guide to configure the workspace to your needs. For further resources, our video
        tutorials and audience-specific documentations are designed to provide you with a in-depth understanding of our
        platform.
      </p>
      <div className="mt-6 flex items-center space-x-5">
        <button
          type="button"
          className="whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis"
        >
          Get started
        </button>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-tremor-default font-medium text-tremor-brand dark:text-dark-tremor-brand"
        >
          View tutorials
          <RiExternalLinkLine className="h-4 w-4" aria-hidden={true} />
        </a>
      </div>
    </Card>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
