import { Alert, Collapse } from "antd";
import { MacScrollbar } from "mac-scrollbar";
import { Line } from "@ant-design/plots";

const SiteCharts = ({ siteDetails }) => {
  // 处理传入数据为图表
  const dailyData = siteDetails.daily;
  const chartData = [...dailyData].reverse().map((data) => {
    const { uptime, date } = data;
    return {
      time: date.format("YYYY-MM-DD"),
      value: uptime,
    };
  });

  // 图标配置
  const chartConfig = {
    data: chartData,
    padding: "auto",
    xField: "time",
    yField: "value",
    offsetY: 0,
    meta: {
      value: {
        alias: "当日可用率",
        formatter: (v) => `${v}%`,
      },
    },
    xAxis: {
      tickCount: chartData.length,
    },
    smooth: true,
  };

  return (
    <MacScrollbar style={{ maxHeight: "66vh" }}>
      <div className="site-details">
        {siteDetails.status !== "ok" ? (
          siteDetails.average >= 70 ? (
            <Alert
              message="当前站点出错了"
              type="warning"
              showIcon
            />
          ) : (
            <Alert
              message="当前站点持续罢工，请检查"
              type="error"
              showIcon
            />
          )
        ) : (
          <Alert
            message="当前站点正在工作呢"
            type="success"
            showIcon
          />
        )}
        <div className="all">
          <Line {...chartConfig} />
          <Collapse
            style={{ marginTop: "20px" }}
            items={[
              {
                key: "all-data",
                label: "站点详情",
                children: <p>{JSON.stringify(siteDetails)}</p>,
              },
            ]}
          />
        </div>
      </div>
    </MacScrollbar>
  );
};

export default SiteCharts;
