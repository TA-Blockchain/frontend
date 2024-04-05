import { MapDemo } from "@/modules/map";

export default function HomePage() {
  return (
    <>
      <ul>
        <li>
          otomatis register admin kementerian di awal run{" "}
          <code className="bg-gray-800 text-white px-1 py-0.5 rounded-sm">node app.js</code>
        </li>
        <li>forgot password</li>
        <li>company details</li>
        <li>create divisi & divisi details</li>
        <li>list manager & staf kementerian ga perlu button delete</li>
        <li>vehicle management (manager)</li>
        <li>breadcrumbs</li>
      </ul>
      <div className="h-80">
        <MapDemo />
      </div>
    </>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
