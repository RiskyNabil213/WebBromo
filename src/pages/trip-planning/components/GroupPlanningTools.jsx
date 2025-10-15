import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GroupPlanningTools = () => {
  const [groupMembers, setGroupMembers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      role: "organizer",
      preferences: ["Photography", "Sunrise Tours"],
      budget: 2000000,
      status: "confirmed"
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "participant"
  });

  const [groupSettings, setGroupSettings] = useState({
    totalBudget: 8000000,
    preferredActivities: ["Sunrise Tour", "Crater Exploration"],
    accommodationType: "standard",
    transportType: "jeep",
    groupSize: 4
  });

  const [polls, setPolls] = useState([
    {
      id: 1,
      question: "Which sunrise viewing location do you prefer?",
      options: [
        { id: 1, text: "Penanjakan Viewpoint", votes: 3 },
        { id: 2, text: "King Kong Hill", votes: 1 },
        { id: 3, text: "Love Hill", votes: 2 }
      ],
      status: "active",
      createdBy: "Sarah Johnson"
    },
    {
      id: 2,
      question: "Preferred accommodation type?",
      options: [
        { id: 1, text: "Budget Homestay", votes: 1 },
        { id: 2, text: "Standard Hotel", votes: 4 },
        { id: 3, text: "Premium Resort", votes: 1 }
      ],
      status: "completed",
      createdBy: "Sarah Johnson"
    }
  ]);

  const roleOptions = [
    { value: "organizer", label: "Organizer" },
    { value: "participant", label: "Participant" },
    { value: "guest", label: "Guest" }
  ];

  const accommodationOptions = [
    { value: "budget", label: "Budget Homestay" },
    { value: "standard", label: "Standard Hotel" },
    { value: "premium", label: "Premium Resort" }
  ];

  const transportOptions = [
    { value: "jeep", label: "4WD Jeep" },
    { value: "motorbike", label: "Trail Bike" },
    { value: "hiking", label: "Hiking/Walking" }
  ];

  const addMember = () => {
    if (newMember?.name && newMember?.email) {
      const member = {
        id: Date.now(),
        ...newMember,
        preferences: [],
        budget: 0,
        status: "pending"
      };
      setGroupMembers(prev => [...prev, member]);
      setNewMember({ name: "", email: "", role: "participant" });
    }
  };

  const removeMember = (memberId) => {
    setGroupMembers(prev => prev?.filter(member => member?.id !== memberId));
  };

  const updateMemberStatus = (memberId, status) => {
    setGroupMembers(prev => prev?.map(member => 
      member?.id === memberId ? { ...member, status } : member
    ));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'organizer': return 'Crown';
      case 'participant': return 'User';
      case 'guest': return 'UserPlus';
      default: return 'User';
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-text-primary">Group Planning Tools</h3>
          <p className="text-text-secondary text-sm">Coordinate with your travel companions</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Group Members */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-text-primary mb-4">Group Members ({groupMembers?.length})</h4>
            
            {/* Add New Member */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h5 className="text-sm font-medium text-text-primary mb-3">Invite New Member</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Input
                  placeholder="Full Name"
                  value={newMember?.name}
                  onChange={(e) => setNewMember(prev => ({ ...prev, name: e?.target?.value }))}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={newMember?.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e?.target?.value }))}
                />
              </div>
              <div className="flex gap-3">
                <Select
                  options={roleOptions}
                  value={newMember?.role}
                  onChange={(value) => setNewMember(prev => ({ ...prev, role: value }))}
                  className="flex-1"
                />
                <Button
                  variant="default"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={addMember}
                >
                  Invite
                </Button>
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {groupMembers?.map((member) => (
                <div key={member?.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={getRoleIcon(member?.role)} size={16} color="var(--color-primary)" />
                      </div>
                      <div>
                        <h6 className="font-medium text-text-primary">{member?.name}</h6>
                        <p className="text-xs text-text-secondary">{member?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member?.status)}`}>
                        {member?.status}
                      </span>
                      {member?.role !== 'organizer' && (
                        <Button
                          size="xs"
                          variant="ghost"
                          iconName="X"
                          onClick={() => removeMember(member?.id)}
                          className="text-red-500 hover:text-red-700"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-text-secondary">Role:</span>
                      <span className="ml-2 font-medium text-text-primary capitalize">{member?.role}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary">Budget:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {member?.budget > 0 ? formatCurrency(member?.budget) : 'Not set'}
                      </span>
                    </div>
                  </div>

                  {member?.preferences?.length > 0 && (
                    <div className="mt-3">
                      <span className="text-xs text-text-secondary">Preferences:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member?.preferences?.map((pref, index) => (
                          <span key={index} className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {member?.status === 'pending' && member?.role !== 'organizer' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="xs"
                        variant="outline"
                        iconName="Check"
                        onClick={() => updateMemberStatus(member?.id, 'confirmed')}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        iconName="X"
                        onClick={() => updateMemberStatus(member?.id, 'declined')}
                        className="text-red-500"
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Group Settings */}
          <div>
            <h4 className="font-medium text-text-primary mb-4">Group Preferences</h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-4">
              <Input
                label="Total Group Budget"
                type="number"
                value={groupSettings?.totalBudget}
                onChange={(e) => setGroupSettings(prev => ({ 
                  ...prev, 
                  totalBudget: parseInt(e?.target?.value) || 0 
                }))}
              />
              <Select
                label="Accommodation Type"
                options={accommodationOptions}
                value={groupSettings?.accommodationType}
                onChange={(value) => setGroupSettings(prev => ({ 
                  ...prev, 
                  accommodationType: value 
                }))}
              />
              <Select
                label="Transportation"
                options={transportOptions}
                value={groupSettings?.transportType}
                onChange={(value) => setGroupSettings(prev => ({ 
                  ...prev, 
                  transportType: value 
                }))}
              />
            </div>
          </div>
        </div>

        {/* Polls & Decisions */}
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-text-primary mb-4">Group Polls & Decisions</h4>
            
            {/* Create Poll */}
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <h5 className="text-sm font-medium text-text-primary mb-3">Create New Poll</h5>
              <div className="space-y-3">
                <Input placeholder="Poll question..." />
                <div className="space-y-2">
                  <Input placeholder="Option 1" />
                  <Input placeholder="Option 2" />
                  <Button
                    size="xs"
                    variant="ghost"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Option
                  </Button>
                </div>
                <Button
                  variant="default"
                  iconName="Vote"
                  iconPosition="left"
                  fullWidth
                >
                  Create Poll
                </Button>
              </div>
            </div>

            {/* Active Polls */}
            <div className="space-y-4">
              {polls?.map((poll) => (
                <div key={poll?.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h6 className="font-medium text-text-primary">{poll?.question}</h6>
                      <p className="text-xs text-text-secondary">Created by {poll?.createdBy}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      poll?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {poll?.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {poll?.options?.map((option) => {
                      const totalVotes = poll?.options?.reduce((sum, opt) => sum + opt?.votes, 0);
                      const percentage = totalVotes > 0 ? (option?.votes / totalVotes) * 100 : 0;
                      
                      return (
                        <div key={option?.id} className="relative">
                          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                            <span className="text-sm text-text-primary">{option?.text}</span>
                            <span className="text-xs text-text-secondary">{option?.votes} votes</span>
                          </div>
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-primary/20 rounded-lg transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>

                  {poll?.status === 'active' && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="xs"
                        variant="outline"
                        iconName="Vote"
                        iconPosition="left"
                      >
                        Vote
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        iconName="MessageCircle"
                        iconPosition="left"
                      >
                        Discuss
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Communication */}
          <div>
            <h4 className="font-medium text-text-primary mb-4">Group Communication</h4>
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="MessageSquare" size={20} color="var(--color-primary)" />
                  <div className="flex-1">
                    <h6 className="font-medium text-text-primary text-sm">Group Chat</h6>
                    <p className="text-xs text-text-secondary">3 new messages</p>
                  </div>
                  <Button size="xs" variant="outline">Open</Button>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="Calendar" size={20} color="var(--color-primary)" />
                  <div className="flex-1">
                    <h6 className="font-medium text-text-primary text-sm">Shared Calendar</h6>
                    <p className="text-xs text-text-secondary">View group availability</p>
                  </div>
                  <Button size="xs" variant="outline">View</Button>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <Icon name="FileText" size={20} color="var(--color-primary)" />
                  <div className="flex-1">
                    <h6 className="font-medium text-text-primary text-sm">Shared Documents</h6>
                    <p className="text-xs text-text-secondary">Itinerary, bookings, etc.</p>
                  </div>
                  <Button size="xs" variant="outline">Access</Button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              fullWidth
              iconName="Share"
              iconPosition="left"
            >
              Share Plan
            </Button>
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              className="volcanic-glow"
            >
              Book for Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPlanningTools;