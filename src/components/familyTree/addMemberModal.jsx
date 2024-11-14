import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addMember } from "../../store/slices/familyTreeSlice";

const relationshipOptions = {
  parent: ["Father", "Mother"],
  spouse: ["Spouse"],
  child: ["Son", "Daughter"],
  sibling: ["Brother", "Sister"],
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(2, "Too Short"),
  relationship: Yup.string().required("Required"),
  relationshipType: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required("Required"),
  photo: Yup.string(),
});

function AddMemberModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { members, currentUser } = useSelector((state) => state.familyTree);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      relationship: "",
      relationshipType: "",
      gender: "",
      dateOfBirth: "",
      photo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newMember = {
        id: Date.now(),
        ...values,
        photo:
          selectedPhoto ||
          `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.name}`,
      };

      // Handle different relationship types
      if (values.relationshipType === "Father") {
        newMember.gender = "male";
        newMember.children = [currentUser.id];
      } else if (values.relationshipType === "Mother") {
        newMember.gender = "female";
        newMember.children = [currentUser.id];
      } else if (values.relationshipType === "Spouse") {
        newMember.pids = [currentUser.id];
      } else if (["Son", "Daughter"].includes(values.relationshipType)) {
        newMember.pid = currentUser.id;
        newMember.mid = currentUser.spouseId;
      }

      dispatch(addMember(newMember));
      onClose();
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Family Member</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              {...formik.getFieldProps("name")}
              className="w-full p-2 border rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Relationship
            </label>
            <select
              {...formik.getFieldProps("relationship")}
              className="w-full p-2 border rounded-md"
              onChange={(e) => {
                formik.setFieldValue("relationship", e.target.value);
                formik.setFieldValue("relationshipType", "");
              }}
            >
              <option value="">Select Relationship</option>
              {Object.keys(relationshipOptions).map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
            {formik.touched.relationship && formik.errors.relationship && (
              <div className="text-red-500 text-sm">
                {formik.errors.relationship}
              </div>
            )}
          </div>

          {formik.values.relationship && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Relationship Type
              </label>
              <select
                {...formik.getFieldProps("relationshipType")}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Type</option>
                {relationshipOptions[formik.values.relationship].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {formik.touched.relationshipType &&
                formik.errors.relationshipType && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.relationshipType}
                  </div>
                )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select
              {...formik.getFieldProps("gender")}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...formik.getFieldProps("dateOfBirth")}
              className="w-full p-2 border rounded-md"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <div className="text-red-500 text-sm">
                {formik.errors.dateOfBirth}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {selectedPhoto && (
            <div className="mt-2">
              <img
                src={selectedPhoto}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>
          )}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple text-white rounded-md"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMemberModal;
