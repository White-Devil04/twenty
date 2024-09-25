import { InjectRepository } from '@nestjs/typeorm';

import { Command } from 'nest-commander';
import { Repository } from 'typeorm';

import {
  ActiveWorkspacesCommandOptions,
  ActiveWorkspacesCommandRunner,
} from 'src/database/commands/active-workspaces.command';
import { MigratePhoneFieldsToPhonesCommand } from 'src/database/commands/upgrade-version/0-32/0-32-migrate-phone-fields-to-phones.command';
import { Workspace } from 'src/engine/core-modules/workspace/workspace.entity';
import { SyncWorkspaceMetadataCommand } from 'src/engine/workspace-manager/workspace-sync-metadata/commands/sync-workspace-metadata.command';

type UpdateTo0_32CommandOptions = ActiveWorkspacesCommandOptions;

@Command({
  name: 'upgrade-0.32',
  description: 'Upgrade to 0.32',
})
export class UpgradeTo0_32Command extends ActiveWorkspacesCommandRunner {
  constructor(
    @InjectRepository(Workspace, 'core')
    protected readonly workspaceRepository: Repository<Workspace>,
    private readonly syncWorkspaceMetadataCommand: SyncWorkspaceMetadataCommand,
    private readonly migratePhoneFieldsToPhones: MigratePhoneFieldsToPhonesCommand,
  ) {
    super(workspaceRepository);
  }

  async executeActiveWorkspacesCommand(
    _passedParam: string[],
    options: UpdateTo0_32CommandOptions,
    workspaceIds: string[],
  ): Promise<void> {
    await this.syncWorkspaceMetadataCommand.executeActiveWorkspacesCommand(
      _passedParam,
      { ...options, force: true },
      workspaceIds,
    );
    await this.migratePhoneFieldsToPhones.executeActiveWorkspacesCommand(
      _passedParam,
      options,
      workspaceIds,
    );
  }
}