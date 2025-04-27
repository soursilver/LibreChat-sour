import React, { useState, useRef } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { MessageSquare, Command, PlusCircle } from 'lucide-react'; // <--- ADDED: PlusCircle icon
import { SettingsTabValues } from 'librechat-data-provider';
import type { TDialogProps } from '~/common';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { GearIcon, DataIcon, SpeechIcon, UserIcon, ExperimentIcon } from '~/components/svg';
// <--- ADDED: Import the new AddModels component (needs exporting from SettingsTabs/index.ts)
import { General, Chat, Speech, Beta, Commands, Data, Account, AddModels } from './SettingsTabs';
import { useMediaQuery, useLocalize, TranslationKeys } from '~/hooks';
import { cn } from '~/utils';

// <--- ADDED: Define a constant for the new tab value (as it's not in SettingsTabValues)
const API_SETTINGS_TAB_VALUE = 'apiSettings';

export default function Settings({ open, onOpenChange }: TDialogProps) {
  const isSmallScreen = useMediaQuery('(max-width: 767px)');
  const localize = useLocalize();
  // <--- MODIFIED: Adjusted type slightly to allow the new string value alongside the enum
  const [activeTab, setActiveTab] = useState<SettingsTabValues | typeof API_SETTINGS_TAB_VALUE>(
    SettingsTabValues.GENERAL,
  );
  const tabRefs = useRef({});

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // <--- ADDED: Include the new AddModels tab value in the navigation array
    const tabs = [
      SettingsTabValues.GENERAL,
      SettingsTabValues.CHAT,
      API_SETTINGS_TAB_VALUE,
      SettingsTabValues.BETA,
      SettingsTabValues.COMMANDS,
      SettingsTabValues.SPEECH,
      SettingsTabValues.DATA,
      SettingsTabValues.ACCOUNT,
      //API_SETTINGS_TAB_VALUE, // <-- New value added here
    ];
    const currentIndex = tabs.indexOf(activeTab);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveTab(tabs[(currentIndex + 1) % tabs.length] as SettingsTabValues | typeof API_SETTINGS_TAB_VALUE);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length] as SettingsTabValues | typeof API_SETTINGS_TAB_VALUE);
        break;
      case 'Home':
        event.preventDefault();
        setActiveTab(tabs[0] as SettingsTabValues | typeof API_SETTINGS_TAB_VALUE);
        break;
      case 'End':
        event.preventDefault();
        setActiveTab(tabs[tabs.length - 1] as SettingsTabValues | typeof API_SETTINGS_TAB_VALUE);
        break;
    }
  };

  // <--- MODIFIED: Adjusted type slightly for the array elements' value property
  const settingsTabs: {
    value: SettingsTabValues | string; // Allow string for the new label
    icon: React.JSX.Element;
    label: TranslationKeys | string; 
  }[] = [
    {
      value: SettingsTabValues.GENERAL,
      icon: <GearIcon />,
      label: 'com_nav_setting_general',
    },
    {
      value: SettingsTabValues.CHAT,
      icon: <MessageSquare className="icon-sm" />,
      label: 'com_nav_setting_chat',
    },
    // <--- ADDED: New entry for the AddModels Tab Trigger
    {
        value: API_SETTINGS_TAB_VALUE,
        icon: <PlusCircle className="icon-sm" />, // Using the imported KeyRound icon
        label: 'com_ui_select_model_provider', // Use a localization key (add this key to your locale files!) or a temporary string 'API Settings'
    },
    {
      value: SettingsTabValues.BETA,
      icon: <ExperimentIcon />,
      label: 'com_nav_setting_beta',
    },
    {
      value: SettingsTabValues.COMMANDS,
      icon: <Command className="icon-sm" />,
      label: 'com_nav_commands',
    },
    {
      value: SettingsTabValues.SPEECH,
      icon: <SpeechIcon className="icon-sm" />,
      label: 'com_nav_setting_speech',
    },
    {
      value: SettingsTabValues.DATA,
      icon: <DataIcon />,
      label: 'com_nav_setting_data',
    },
    {
      value: SettingsTabValues.ACCOUNT,
      icon: <UserIcon />,
      label: 'com_nav_setting_account',
    },
  ];

  const handleTabChange = (value: string) => {
    // <--- MODIFIED: Cast the incoming string value to the allowed union type for setActiveTab
    setActiveTab(value as SettingsTabValues | typeof API_SETTINGS_TAB_VALUE);
  };

  return (
    <Transition appear show={open}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black opacity-50 dark:opacity-80" aria-hidden="true" />
        </TransitionChild>
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className={cn('fixed inset-0 flex w-screen items-center justify-center p-4')}>
            <DialogPanel
              className={cn(
                'min-h-[600px] overflow-hidden rounded-xl rounded-b-lg bg-background pb-6 shadow-2xl backdrop-blur-2xl animate-in sm:rounded-2xl md:min-h-[373px] md:w-[680px]',
              )}
            >
              <DialogTitle
                className="mb-1 flex items-center justify-between p-6 pb-5 text-left"
                as="div"
              >
                <h2 className="text-lg font-medium leading-6 text-text-primary">
                  {localize('com_nav_settings')}
                </h2>
                <button
                  type="button"
                  className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-xheavy focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-surface-primary dark:focus:ring-offset-surface-primary"
                  onClick={() => onOpenChange(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-text-primary"
                  >
                    <line x1="18" x2="6" y1="6" y2="18"></line>
                    <line x1="6" x2="18" y1="6" y2="18"></line>
                  </svg>
                  <span className="sr-only">{localize('com_ui_close')}</span>
                </button>
              </DialogTitle>
              <div className="max-h-[550px] overflow-auto px-6 md:max-h-[400px] md:min-h-[400px] md:w-[680px]">
                <Tabs.Root
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="flex flex-col gap-10 md:flex-row"
                  orientation="vertical"
                >
                  <Tabs.List
                    aria-label="Settings"
                    className={cn(
                      'min-w-auto max-w-auto relative -ml-[8px] flex flex-shrink-0 flex-col flex-nowrap overflow-auto sm:max-w-none',
                      isSmallScreen
                        ? 'flex-row rounded-xl bg-surface-secondary'
                        : 'sticky top-0 h-full',
                    )}
                    onKeyDown={handleKeyDown}
                  >
                    {settingsTabs.map(({ value, icon, label }) => (
                      <Tabs.Trigger
                        key={value}
                        className={cn(
                          'group relative z-10 m-1 flex items-center justify-start gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 ease-in-out',
                          isSmallScreen
                            ? 'flex-1 justify-center text-nowrap p-1 px-3 text-sm text-text-secondary radix-state-active:bg-surface-hover radix-state-active:text-text-primary'
                            : 'bg-transparent text-text-secondary radix-state-active:bg-surface-tertiary radix-state-active:text-text-primary',
                        )}
                        value={value}
                        ref={(el) => (tabRefs.current[value] = el)}
                      >
                        {icon}
                        {/* // <--- MODIFIED: Cast label to TranslationKeys, assuming new label is added there */}
                        {localize(label as TranslationKeys)}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>
                  <div className="overflow-auto sm:w-full sm:max-w-none md:pr-0.5 md:pt-0.5">
                    <Tabs.Content value={SettingsTabValues.GENERAL}>
                      <General />
                    </Tabs.Content>
                    <Tabs.Content value={SettingsTabValues.CHAT}>
                      <Chat />
                    </Tabs.Content>
                    <Tabs.Content value={SettingsTabValues.BETA}>
                      <Beta />
                    </Tabs.Content>
                    <Tabs.Content value={SettingsTabValues.COMMANDS}>
                      <Commands />
                    </Tabs.Content>
                    <Tabs.Content value={SettingsTabValues.SPEECH}>
                      <Speech />
                    </Tabs.Content>
                    <Tabs.Content value={SettingsTabValues.DATA}>
                      <Data />
                    </Tabs.Content>
                    <Tabs.Content value={SettingsTabValues.ACCOUNT}>
                      <Account />
                    </Tabs.Content>
                    {/* <--- ADDED: New Tabs.Content section for the ApiSettings component */}
                    <Tabs.Content value={API_SETTINGS_TAB_VALUE}>
                      <AddModels />
                    </Tabs.Content>
                    {/* END ADDED --- */}
                  </div>
                </Tabs.Root>
              </div>
            </DialogPanel>
          </div>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
// <--- REMINDER: The duplicate import and component definition below this line in your original code should be removed.
// import React, { useState, useRef } from 'react';
// ... (rest of duplicated code) ...