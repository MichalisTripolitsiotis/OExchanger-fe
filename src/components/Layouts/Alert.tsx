const Alert: React.FC<{ isOpen: boolean, title: string, message: string, onClose: any }> = ({ isOpen, title, message, onClose }) => {
    return (
        <>
            {isOpen ? (
                <>
                    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 overflow-auto`}>
                        <div className="fixed inset-0 bg-gray-600 opacity-50" onClick={onClose} />
                        <div className="relative max-w-sm mx-auto mt-10 z-60">
                            <div className="bg-white rounded-lg shadow-lg p-10 text-center">
                                <h3 className="text-xl font-medium">{title}</h3>
                                <p className="mt-4 text-gray-600">{message}</p>
                                <button
                                    className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                                    onClick={onClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}

export default Alert;