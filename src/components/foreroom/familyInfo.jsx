function FamilyInfo() {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Family Tree Preview</h2>
        <div className="bg-gray-50 rounded p-4 mb-4">
          <div className="text-center text-sm text-gray-600">
            Family tree preview will be displayed here
          </div>
        </div>
        <button className="w-full bg-purple text-white py-2 rounded-md hover:bg-opacity-90">
          View Full Tree
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Family Contacts</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((contact) => (
            <div key={contact} className="flex items-center gap-3">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact}`}
                alt="Contact"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">Family Member {contact}</div>
                <div className="text-sm text-gray-500">Relation</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {[1, 2].map((event) => (
            <div key={event} className="border-l-4 border-purple pl-3">
              <div className="font-medium">Family Event {event}</div>
              <div className="text-sm text-gray-500">Date</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FamilyInfo;
