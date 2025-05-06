const Analytics = () => {
  interface AnalyticsCardProps {
    label: string;
    value: string;
  }

  const AnalyticsCard = ({ label, value }: AnalyticsCardProps) => {
    return (
      <div className="flex items-center gap-2.5 p-4 bg-gray100 rounded-md shadow-sm">
        <div className="w-12 text-[32px] font-bold text-gray500 leading-none">{value}</div>
        <div className="w-px h-8 bg-gray300"></div>
        <div className="text-context font-medium">{label}</div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 bg-white p-5 basis-2/5 rounded-2xl border">
      <h4 className="font-semibold text-xl text-black mb-2">Analytics</h4>
      <hr />
      <div className="flex flex-col gap-4">
        <AnalyticsCard label="Clients Invited" value="0" />
        <AnalyticsCard label="Clients Converted" value="0" />
        <AnalyticsCard label="Total Reward" value="$0" />
      </div>
    </div>
  );
};

export default Analytics;
