export default function About() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">About This Project</h2>
      <p className="mb-2">
        This project is Assessment 1 of a multi-stage assignment: building the
        frontend for an RSS Server that feeds into a Learning Management
        System (LMS). This stage is frontend-only — no backend or live RSS
        data yet.
      </p>
      <p className="mb-2">Name: Irem Ercan Sumer</p>
      <p className="mb-4">Student Number: 22591527</p>

      <h3 className="text-xl font-semibold mb-2">Demo Video</h3>
      <iframe
        className="w-full max-w-2xl aspect-video"
        src="https://www.loom.com/embed/YOUR_VIDEO_ID"
        title="Demo video explaining the website"
        allowFullScreen
      ></iframe>
    </div>
  );
}