"use client";

import { Card, Typography, Space, Button, Row, Col } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Space direction="vertical" size="large" className="w-full">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card>
              <Typography.Title level={2} className="!mb-2">
                LQ Shop
              </Typography.Title>
              <Typography.Paragraph className="!mb-0" type="secondary">
                Mua bán account Liên Quân Mobile an toàn, nhanh chóng.
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card
              title="Khám phá tài khoản"
              extra={<Link href="/accounts">Xem tất cả</Link>}>
              <Typography.Paragraph>
                Duyệt danh sách tài khoản theo rank, giá, số tướng/skin.
              </Typography.Paragraph>
              <Space>
                <Link href="/accounts">
                  <Button type="primary">Bắt đầu mua</Button>
                </Link>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              title="Quản trị"
              extra={<Link href="/admin">Vào dashboard</Link>}>
              <Typography.Paragraph>
                Thêm/sửa/xóa tài khoản, theo dõi đơn hàng, quản lý thanh toán.
              </Typography.Paragraph>
              <Space>
                <Link href="/admin">
                  <Button>Vào Admin</Button>
                </Link>
              </Space>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card>
              <Typography.Title level={4} className="!mb-2">
                Bắt đầu ngay
              </Typography.Title>
              <Space size="middle">
                <Link href="/auth/register">
                  <Button type="primary">Đăng ký</Button>
                </Link>
                <Link href="/auth/login">
                  <Button>Đăng nhập</Button>
                </Link>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
