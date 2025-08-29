import { useEffect, useState } from "react";
import { useUpdateSOSContactsMutation, useGetSOSInfoQuery } from "@/redux/auth.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Loading from "@/component/common/loading";

interface Contact {
  name: string;
  phone: string;
  email?: string;
  _id?: string;
}

const SOSContactUpdate = () => {
  const { data: sosData, isLoading: isLoadingSOS } = useGetSOSInfoQuery(undefined);
  const [updateSOSContacts, { isLoading: isUpdating }] = useUpdateSOSContactsMutation();

  const [enableSOS, setEnableSOS] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Populate fields from backend
  useEffect(() => {
    if (sosData?.data) {
      setEnableSOS(!!sosData.data.enableSOS); // ✅ set initial toggle state based on DB
      setContacts(sosData.data.emergencyContacts || []);
    }
  }, [sosData]);

  const handleChange = (index: number, field: keyof Contact, value: string) => {
    const updated = [...contacts];
    updated[index][field] = value;
    setContacts(updated);
  };

  const addContact = () => {
    setContacts([...contacts, { name: "", phone: "", email: "" }]);
  };

  const removeContact = (index: number) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  const handleSubmit = async () => {
    try {
      await updateSOSContacts({ enableSOS, emergencyContacts: contacts }).unwrap();
      toast.success("SOS Contacts updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update SOS contacts.");
    }
  };

  if (isLoadingSOS) return <Loading></Loading>;

  return (
    <Card className="max-w-2xl mx-auto p-4 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Update SOS Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        {/* SOS Toggle */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-medium">Enable SOS</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={enableSOS}
              onChange={(e) => setEnableSOS(e.target.checked)}
            />
            <div
              className={`w-14 h-8 rounded-full shadow-inner transition-colors duration-300 ${
                enableSOS ? "bg-[#175C4F]" : "bg-gray-300"
              }`}
            ></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                enableSOS ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </label>
        </div>

        {/* Contacts */}
        {contacts.map((contact, index) => (
          <div
            key={contact._id || index}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 p-3 border rounded-lg items-end"
          >
            <Input
              placeholder="Name"
              value={contact.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <Input
              placeholder="Phone"
              value={contact.phone}
              onChange={(e) => handleChange(index, "phone", e.target.value)}
            />
            <Input
              placeholder="Email (optional)"
              value={contact.email || ""}
              onChange={(e) => handleChange(index, "email", e.target.value)}
            />

            <Button
              variant="destructive"
              className="col-span-1 md:col-span-3"
              onClick={() => removeContact(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button variant="secondary" className="w-full mb-4" onClick={addContact}>
          + Add Contact
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isUpdating}
          className="w-full bg-[#175C45] hover:bg-black"
        >
          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SOSContactUpdate;
