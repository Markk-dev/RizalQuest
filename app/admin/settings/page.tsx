"use client"

import { Save, LogOut } from "lucide-react"
import { useState } from "react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "Rizal Quest",
    maxHearts: 5,
    xpPerQuestion: 10,
    dailyQuestReset: "12:00 AM",
  })

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-black mb-8">Settings</h1>

      <div className="max-w-2xl bg-white rounded-xl shadow-md p-8 space-y-6">
        {/* Platform Settings */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Platform Name</label>
          <input
            type="text"
            value={settings.platformName}
            onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary"
          />
        </div>

        {/* Game Settings */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Max Hearts</label>
            <input
              type="number"
              value={settings.maxHearts}
              onChange={(e) => setSettings({ ...settings, maxHearts: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-black mb-2">XP Per Question</label>
            <input
              type="number"
              value={settings.xpPerQuestion}
              onChange={(e) => setSettings({ ...settings, xpPerQuestion: Number.parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Daily Reset */}
        <div>
          <label className="block text-sm font-semibold text-black mb-2">Daily Quest Reset Time</label>
          <input
            type="time"
            value={settings.dailyQuestReset}
            onChange={(e) => setSettings({ ...settings, dailyQuestReset: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-primary"
          />
        </div>

        {/* Save Button */}
        <div className="flex gap-4 pt-6">
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold">
            <Save size={20} />
            Save Changes
          </button>
          <button className="flex items-center gap-2 bg-gray-light text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
