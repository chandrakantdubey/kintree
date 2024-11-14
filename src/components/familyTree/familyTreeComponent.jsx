import { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";

function FamilyTreeComponent() {
  const divRef = useRef(null);

  useEffect(() => {
    const family = new FamilyTree(divRef.current, {
      nodes: [
        {
          id: 1,
          pids: [2],
          name: "John Smith",
          gender: "male",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        },
        {
          id: 2,
          pids: [1],
          name: "Sarah Smith",
          gender: "female",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        },
        {
          id: 3,
          pid: 1,
          mid: 2,
          name: "Mike Smith",
          gender: "male",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        },
        {
          id: 4,
          pid: 1,
          mid: 2,
          name: "Lisa Smith",
          gender: "female",
          photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        },
      ],
      nodeBinding: {
        field_0: "name",
        img_0: "photo",
      },
    });

    return () => {
      family.destroy();
    };
  }, []);

  return <div ref={divRef} className="h-[600px]"></div>;
}

export default FamilyTreeComponent;
