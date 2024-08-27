import { Card } from "antd";
import "./index.scss";
const HomePage = () => {
  return (
    <div className="home_page">
      <Card title="Card title" bordered className="home_page_card">
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default HomePage;
