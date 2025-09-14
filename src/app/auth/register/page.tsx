"use client";

import { Alert, Button, Card, Form, Input, Typography } from "antd";
import useRegister from "./hooks/useRegister";

export default function RegisterPage() {
  const { loading, error, ok, onFinish } = useRegister();

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <Card>
        <Typography.Title level={3} className="!mb-4">
          Đăng ký
        </Typography.Title>
        {error && <Alert type="error" message={error} className="!mb-4" />}
        {ok && (
          <Alert
            type="success"
            message="Đăng ký thành công!"
            className="!mb-4"
          />
        )}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}>
            <Input placeholder="Tên hiển thị" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}>
            <Input placeholder="you@example.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu" },
              { min: 6, message: "Tối thiểu 6 ký tự" },
            ]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
