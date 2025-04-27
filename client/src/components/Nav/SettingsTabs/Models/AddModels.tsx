// ~/components/Nav/SettingsTabs/AddModels.tsx
import React, { useState } from 'react';
import { useLocalize } from '~/hooks';
import { Label } from '~/components/ui/Label';
import { Input } from '~/components/ui/Input';
import { Button } from '~/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/Select';
import { cn } from '~/utils'; // Import cn if not already present

// Define the list of providers
const modelProviders = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'google', label: 'Google' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'deepseek', label: 'DeepSeek' },
  { value: 'alibaba', label: 'Alibaba' },
  { value: 'meta', label: 'Meta' },
  { value: 'mistralai', label: 'Mistral AI' },
  // Add other providers as needed
];

export default function AddModels() {
  const localize = useLocalize();
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');

  // Placeholder function for future implementation
  const handleAddModel = () => {
    console.log('Attempting to add model:', {
      provider: selectedProvider,
      name: modelName,
    });
    // Logic to actually add/save the model will go here later
  };

  return (
    <div className="flex flex-col gap-4 text-sm text-text-primary">
      <div className="border-b border-border-medium pb-4 last:border-b-0">
        <h2 className="text-lg font-medium leading-6 text-text-primary mb-4">
          {localize('com_nav_setting_add_custom_model')} {/* You'll need to add this key */}
        </h2>

        <div className="mb-4 flex flex-col gap-2">
          <Label htmlFor="model-provider-select" className="text-text-primary">
            {localize('com_ui_select_provider')} {/* You'll need to add this key */}
          </Label>
          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger id="model-provider-select" className="w-full">
              <SelectValue placeholder={localize('com_ui_select_model_provider_ph')} /> {/* Add key */}
            </SelectTrigger>
            {/* Apply background, text, border, shadow, and z-index classes */}
            <SelectContent
              className={cn(
                'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border-medium bg-background p-1 text-text-primary shadow-md animate-in fade-in-80',
                // Adjust background/text colors if using popover specific theme variables:
                // 'bg-popover text-popover-foreground'
              )}
            >
              {modelProviders.map((provider) => (
                <SelectItem key={provider.value} value={provider.value}>
                  {provider.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <Label htmlFor="model-name-input" className="text-text-primary">
            {localize('com_ui_model_name')} {/* You'll need to add this key */}
          </Label>
          <Input
            id="model-name-input"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder={localize('com_ui_model_name_placeholder')} /* e.g., "claude-3-opus-20240229" - Add key */
            className="w-full"
          />
        </div>

        {/* Button is present but non-functional for now as requested */}
        <Button
            type="button"
            onClick={handleAddModel}
            disabled={!selectedProvider || !modelName} // Disable if provider or name is missing
        >
            {localize('com_ui_add_model')} {/* You'll need to add this key */}
        </Button>
        <p className="mt-2 text-xs text-text-secondary">
            {localize('com_nav_setting_add_model_description')} {/* Add key - e.g., "Functionality to save models coming soon." */}
        </p>
      </div>
    </div>
  );
}