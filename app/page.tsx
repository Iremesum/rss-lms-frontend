// Home page - the main landing page for the site.
// Gives a brief introduction to the project, as required by the assignment brief.

export default function Home() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Welcome</h2>
      <p className="mb-2">
        This is the frontend for an RSS Server that will feed content into a
        Learning Management System (LMS). This is Assessment 1 of a
        multi-stage project — right now the focus is on building a clean,
        usable, and responsive interface.
      </p>
      <p>
        Use the navigation bar above to explore the About, Feeds, and
        Settings pages.
      </p>
    </div>
  );
}