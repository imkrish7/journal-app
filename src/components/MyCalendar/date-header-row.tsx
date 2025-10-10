import React from "react";

const DateHeaderRow = () => {
	return (
		<div className="grid grid-cols-8 border-t border-gray-200 sticky top-0 left-0 w-full">
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900"></div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900">
				Jan 7
			</div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900">
				Jan 8
			</div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-indigo-600">
				Jan 9
			</div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900">
				Jan 10
			</div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900">
				Jan 11
			</div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900">
				Jan 12
			</div>
			<div className="p-3.5 flex items-center justify-center text-sm font-medium  text-gray-900">
				Jan 13
			</div>
		</div>
	);
};

export default DateHeaderRow;
