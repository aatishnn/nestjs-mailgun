import { Module } from '@nestjs/common';
import { ConfigurationMailgun } from './configuration';
import { MAILGUN_OPTIONS } from './tokens/tokens';
import { MailgunService } from './services/relay/mailgun.service';

@Module({})
export class MailgunModule {
  public static forRoot(config: ConfigurationMailgun) {
    return MailgunModule.forRootAsync({
      useValue: config,
    });
  }

  public static forRootAsync(configurationProvider) {
    return {
      module: MailgunModule,
      providers: [
        { provide: MAILGUN_OPTIONS, ...configurationProvider },
        MailgunService,
      ],
      exports: [MailgunService],
    };
  }
}
