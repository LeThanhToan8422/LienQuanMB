"use client";

import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Select,
  Space,
  Upload,
  Image as AntImage,
  Badge,
} from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  StarFilled,
  CrownOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useAdminAccountModal from "./hooks/useAdminAccountModal";
import { AdminAccount } from "../../types";
import {
  getCharacterNames,
  getSkinsForCharacter,
  getSkinDetails,
  getRarityColor,
} from "../../data/characterSkins";
import Image from "next/image";
import { RANK_OPTIONS } from "@/lib/ranks";

/**
 * Props interface for AdminAccountModal component
 */
interface AdminAccountModalProps {
  open: boolean; // Whether modal is visible
  editing: AdminAccount | null; // Account being edited (null for create mode)
  onClose: () => void; // Callback when modal is closed
  onSuccess: () => void; // Callback when operation is successful
  mode?: "create" | "edit" | "view"; // Thêm mode prop
}

/**
 * Modal component for creating and editing admin accounts
 * Handles form display, image management, and user interactions
 * @param props - Component props
 * @returns JSX element
 */
export default function AdminAccountModal({
  open,
  editing,
  onClose,
  onSuccess,
  mode = "create", // Default mode
}: AdminAccountModalProps) {
  // Get modal functionality from custom hook
  const {
    formModal,
    previewUrls,
    loading: modalLoading,
    setCover,
    moveImage,
    removeImage,
    handleFileUpload,
    onSubmitModal,
    resetModal,
  } = useAdminAccountModal(editing, onSuccess);

  /**
   * Handle modal close with cleanup
   * Closes modal and resets form state
   */
  const handleClose = () => {
    onClose();
    resetModal();
  };

  // Determine if fields should be disabled
  const isViewMode = mode === "view";

  return (
    <Modal
      title={
        isViewMode
          ? "Xem chi tiết tài khoản"
          : editing
          ? "Sửa tài khoản"
          : "Thêm tài khoản mới"
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={1000}>
      <Form form={formModal} layout="vertical" onFinish={onSubmitModal}>
        <Row gutter={[24, 0]}>
          {/* LEFT COLUMN - Text/Number Inputs */}
          <Col xs={24} lg={12}>
            <div className="space-y-4">
              {/* Basic Info */}
              <Row gutter={[16, 0]}>
                <Col span={12}>
                  <Form.Item
                    name="rank"
                    label="Rank"
                    rules={[{ required: true }]}>
                    <Select
                      placeholder="Chọn rank"
                      disabled={isViewMode} // Disable in view mode
                      options={RANK_OPTIONS}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Trạng thái"
                    rules={[{ required: true }]}>
                    <Select
                      placeholder="Chọn trạng thái"
                      disabled={isViewMode} // Disable in view mode
                      options={[
                        { value: "available", label: "Có sẵn" },
                        { value: "reserved", label: "Đã đặt" },
                        { value: "sold", label: "Đã bán" },
                        { value: "hidden", label: "Ẩn" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Account Details */}
              <Row gutter={[16, 0]}>
                <Col span={8}>
                  <Form.Item
                    name="price"
                    label="Giá"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="heroesCount"
                    label="Số tướng"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="skinsCount"
                    label="Số skin"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Metadata */}
              <Row gutter={[16, 0]}>
                <Col span={6}>
                  <Form.Item
                    name="level"
                    label="Cấp độ"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="matches"
                    label="Số trận"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="winRate"
                    label="Tỷ lệ thắng"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="reputation"
                    label="Uy tín"
                    rules={[{ required: true }]}>
                    <InputNumber
                      className="!w-full"
                      min={0}
                      disabled={isViewMode} // Disable in view mode
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Description */}
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea
                  rows={4}
                  placeholder="Mô tả chi tiết về tài khoản..."
                  disabled={isViewMode} // Disable in view mode
                />
              </Form.Item>
            </div>
          </Col>

          {/* RIGHT COLUMN - Media & Visual */}
          <Col xs={24} lg={12}>
            <div className="space-y-6">
              {/* Image Upload Section */}
              <Form.Item label="Tải ảnh lên Cloudinary">
                {/* Disable upload in view mode */}
                {!isViewMode && (
                  <Upload
                    beforeUpload={() => false}
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    showUploadList={false}>
                    <Button icon={<UploadOutlined />}>Chọn ảnh từ máy</Button>
                  </Upload>
                )}

                {/* Image Preview Grid */}
                {previewUrls.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {previewUrls.map((u: string, idx: number) => (
                      <div key={u} className="relative group">
                        {idx === 0 ? (
                          <Badge.Ribbon text="COVER" color="blue">
                            <AntImage
                              src={u}
                              alt={`img-${idx}`}
                              className="h-24 w-full object-cover"
                            />
                          </Badge.Ribbon>
                        ) : (
                          <AntImage
                            src={u}
                            alt={`img-${idx}`}
                            className="h-24 w-full object-cover"
                          />
                        )}

                        {/* Hide action buttons in view mode */}
                        {!isViewMode && (
                          <div className="!absolute !top-1 !right-1 flex gap-1 opacity-0 group-hover:opacity-100">
                            <Button
                              size="small"
                              icon={<StarFilled />}
                              onClick={() => setCover(u)}
                              title="Đặt làm ảnh bìa"
                            />
                            <Button
                              size="small"
                              icon={<ArrowLeftOutlined />}
                              onClick={() => moveImage(idx, -1)}
                              title="Di chuyển sang trái"
                            />
                            <Button
                              size="small"
                              icon={<ArrowRightOutlined />}
                              onClick={() => moveImage(idx, 1)}
                              title="Di chuyển sang phải"
                            />
                            <Button
                              size="small"
                              danger
                              type="primary"
                              icon={<DeleteOutlined />}
                              onClick={() => removeImage(u)}
                              title="Xóa ảnh"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Form.Item>

              {/* Character Skins Section */}
              <Form.Item
                label={
                  <>
                    <CrownOutlined className="mr-2" />
                    Character Skins
                  </>
                }
                name="characterSkins">
                <Form.List name="characterSkins">
                  {(fields, { add, remove }) => (
                    <div className="space-y-4">
                      {fields.map(({ key, name, ...restField }) => (
                        <div
                          key={key}
                          className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">
                              Skin #{name + 1}
                            </span>
                            {/* Hide delete button in view mode */}
                            {!isViewMode && (
                              <Button
                                type="text"
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={() => remove(name)}>
                                Xóa
                              </Button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Character Selection */}
                            <Form.Item
                              {...restField}
                              name={[name, "character"]}
                              label="Character"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn character!",
                                },
                              ]}>
                              <Select
                                placeholder="Chọn character"
                                showSearch
                                disabled={isViewMode} // Disable in view mode
                                filterOption={(input, option) =>
                                  String(option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                onChange={() => {
                                  if (!isViewMode) {
                                    formModal.setFieldValue(
                                      ["characterSkins", name, "skin"],
                                      undefined
                                    );
                                    formModal.setFieldValue(
                                      ["characterSkins", name, "rarity"],
                                      undefined
                                    );
                                    formModal.setFieldValue(
                                      ["characterSkins", name, "avatar"],
                                      undefined
                                    );
                                    formModal.setFieldValue(
                                      ["characterSkins", name, "background"],
                                      undefined
                                    );
                                  }
                                }}
                                options={getCharacterNames().map(
                                  (characterName) => ({
                                    value: characterName,
                                    label: characterName,
                                  })
                                )}
                              />
                            </Form.Item>

                            {/* Skin Selection */}
                            <Form.Item
                              {...restField}
                              name={[name, "skin"]}
                              label="Skin"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn skin!",
                                },
                              ]}>
                              <Select
                                placeholder="Chọn skin"
                                showSearch
                                disabled={isViewMode} // Disable in view mode
                                filterOption={(input, option) =>
                                  String(option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                onChange={(value) => {
                                  if (!isViewMode) {
                                    const characterName =
                                      formModal.getFieldValue([
                                        "characterSkins",
                                        name,
                                        "character",
                                      ]);
                                    if (characterName && value) {
                                      const skinDetails = getSkinDetails(
                                        characterName,
                                        value
                                      );
                                      if (skinDetails) {
                                        console.log(skinDetails);

                                        formModal.setFieldValue(
                                          ["characterSkins", name, "rarity"],
                                          skinDetails.rarity
                                        );
                                        formModal.setFieldValue(
                                          ["characterSkins", name, "avatar"],
                                          skinDetails.avatar
                                        );
                                        formModal.setFieldValue(
                                          [
                                            "characterSkins",
                                            name,
                                            "background",
                                          ],
                                          skinDetails.background
                                        );
                                      }
                                    }
                                  }
                                }}
                                options={(() => {
                                  const characterName = formModal.getFieldValue(
                                    ["characterSkins", name, "character"]
                                  );
                                  const skins = characterName
                                    ? getSkinsForCharacter(characterName)
                                    : [];
                                  return skins.map((skin) => ({
                                    value: skin.name,
                                    label: (
                                      <div className="flex items-center space-x-2">
                                        <Image
                                          src={skin.avatar}
                                          alt={skin.name}
                                          width={24}
                                          height={24}
                                          className="rounded object-cover"
                                          onError={(e) => {
                                            e.currentTarget.style.display =
                                              "none";
                                          }}
                                        />
                                        <span>{skin.name}</span>
                                        <Badge
                                          color={getRarityColor(skin.rarity)}
                                          text={skin.rarity}
                                          className="text-xs"
                                        />
                                      </div>
                                    ),
                                  }));
                                })()}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ))}

                      {/* Hide add button in view mode */}
                      {!isViewMode && (
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                          className="mt-2">
                          Thêm Character Skin
                        </Button>
                      )}

                      {/* Character Skins Summary */}
                      {fields.length > 0 && (
                        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                          <div className="flex items-center space-x-2 text-blue-700">
                            <CrownOutlined />
                            <span className="font-medium">
                              Tổng cộng: {fields.length} character skin(s)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 pt-4 border-t">
          <Space>
            <Button onClick={handleClose}>Đóng</Button>
            {/* Hide submit button in view mode */}
            {!isViewMode && (
              <Button type="primary" htmlType="submit" loading={modalLoading}>
                {editing ? "Cập nhật" : "Tạo mới"}
              </Button>
            )}
          </Space>
        </div>
      </Form>
    </Modal>
  );
}
