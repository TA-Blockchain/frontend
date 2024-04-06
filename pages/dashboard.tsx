export default function HomePage() {
  return (
    <>
      <ul>
        <li>
          otomatis register admin kementerian di awal run
          <code className="bg-gray-800 text-white px-1 py-0.5 rounded-sm">node app.js</code>
        </li>
        <li>forgot password</li>
        <li>initiate supply chain (admin perusahaan)</li>
        <li>approve supply chain (admin perusahaan)</li>
        <li>approve supply chain (admin kementerian)</li>
        <li>vehicle management (manager)</li>
        <li>list perjalanan sesuai divisi (manager)</li>
        <li>create perjalanan (manager)</li>
        <li>approve perjalanan (manager)</li>
      </ul>
    </>
  );
}

HomePage.title = "Dashboard | Carbon Chain";
