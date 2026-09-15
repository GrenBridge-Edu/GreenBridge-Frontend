import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaymentFinalizeModal } from "./components/PaymentConfirmation";

export const MainTopup = () => {
	const [getSearch] = useSearchParams(),
		navigate = useNavigate(),
		[isModalOpen, setIsModalOpen] = useState<string>("");

	useEffect(() => {
		if (!getSearch?.get("reference")) navigate("/");
	}, [getSearch]);

	useEffect(() => {
		if (getSearch?.get("reference") && getSearch?.get("trxref"))
			setIsModalOpen("Payment Confirmation");
	}, [getSearch]);

	return (
		<>
			<h4 className="font-bold py-4 text-center">Payment Confirmation</h4>
			<div className="border border-[#EFF3FA] p-4 rounded-md min-h-[80vh]"></div>
			<PaymentFinalizeModal
				isOpen={!!isModalOpen}
				onClose={() => setIsModalOpen("")}
				stateData={{
					reference: getSearch?.get("reference"),
					trxref: getSearch?.get("trxref"),
					firstName: getSearch?.get("firstName"),
					email: getSearch?.get("email"),
					lastName: getSearch?.get("lastName"),
					fullname: getSearch?.get("fullname"),
				}}
				next={getSearch?.get("next") || "/"}
			/>
		</>
	);
};

const Topup = () => <MainTopup />;

export default Topup;
