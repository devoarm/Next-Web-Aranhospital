import React from "react";
import {Pagination, Button} from "@nextui-org/react";

export default function PaginationComponent() {
  const [currentPage, setCurrentPage] = React.useState(1);

  return (
    <div className="flex flex-col my-3 gap-5">
      {/* <p className="text-small text-default-500">Selected Page: {currentPage}</p> */}
      <Pagination
        total={10}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          Previous
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
