import FamilyTreeComponent from "../components/familyTree/familyTreeComponent";

function FamilyTree() {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-semibold mb-6">Family Tree</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <FamilyTreeComponent />
      </div>
    </div>
  );
}

export default FamilyTree;
