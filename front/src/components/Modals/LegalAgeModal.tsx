import { useState } from "react";

const LegalAgeModal = () => {
  const [showModal, setShowModal] = useState(true);
    return (
        <>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-end flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-lg font-semibold text-slate-500">
                                        Terms and Conditions
                                    </h3>
                                </div>
                                {/*body*/}
                                <div className="relative p-3 flex">
                                    <p className="my-2 text-slate-500 text-lg">
                                        Debes ser mayor de 18 años para ingresar | Entrada permitida para maiores de 18 años | To enter, you must be + 18 years old.
                                    </p>
                                    <div className="flex items-center justify-end px-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Aceptar
                                        </button>
                                    </div>
                                </div>
                                {/*footer*/}
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    )
}
export default LegalAgeModal;