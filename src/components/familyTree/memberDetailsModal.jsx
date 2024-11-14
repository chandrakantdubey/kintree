import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateMember } from "../../store/familyTreeSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required").min(2, "Too Short"),
  gender: Yup.string().required("Required"),
  dateOfBirth: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required("Required"),
});

function MemberDetailsModal({ member, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: member.name,
      gender: member.gender,
      dateOfBirth: member.dateOfBirth,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        updateMember({
          ...member,
          ...values,
          photo: selectedPhoto || member.photo,
        }),
      );
      setIsEditing(false);
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Member Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {isEditing ? (
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

            {/* <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                {...formik.getFieldProps("gender")}
                className="w-full p-2 border rounded-md"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div> */}

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <input
                type="text"
                value={member.gender}
                disabled
                className="w-full p-2 border rounded-md bg-gray-100"
              />
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

            {(selectedPhoto || member.photo) && (
              <div className="mt-2">
                <img
                  src={selectedPhoto || member.photo}
                  alt={member.name}
                  className="w-20 h-20 object-cover rounded-full"
                />
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={member.photo}
                alt={member.name}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-600">
                  {member.gender.charAt(0).toUpperCase() +
                    member.gender.slice(1)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Date of Birth:</span>{" "}
                {new Date(member.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Age:</span>{" "}
                {new Date().getFullYear() -
                  new Date(member.dateOfBirth).getFullYear()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Relationship:</span>{" "}
                {member.relationshipType}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple text-white rounded-md"
              >
                Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberDetailsModal;
