const Transactions = () => {
  return (
    <>
      <div className="w-full overflow-hidden text-left">
        <div className="flex px-6 py-3 text-black font-medium border rounded">
          <div className="flex-1">Date</div>
          <div className="flex-[2]">Description</div>
          <div className="flex-1">Payment Medivod</div>
          <div className="flex-[2]">Client</div>
          <div className="flex-1">Amount</div>
          <div className="flex-1">Status</div>
        </div>
        <div className="text-sm text-context">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="px-6 hover:bg-gray200 transition-all rounded">
                <div className="flex border-b py-4">
                  <div className="flex-1">Oct 25, 2024</div>
                  <div className="flex-[2]">
                    Invoice for UI/UX Designer Milestone 1
                  </div>
                  <div className="flex-1">Crypto</div>
                  <div className="flex-[2]">Usman Ali Khan</div>
                  <div className="flex-1">USDT 50.00</div>
                  <div className="flex-1">
                    <span
                      className={`px-3 py-1 rounded-md ${
                        i % 3 === 0
                          ? "bg-green200 text-green-800"
                          : i % 3 === 1
                          ? "bg-yellow200 text-yellow-800"
                          : "bg-red200 text-red-800"
                      }`}
                    >
                      {i % 3 === 0
                        ? "Completed"
                        : i % 3 === 1
                        ? "Pending"
                        : "Failed"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Transactions;
