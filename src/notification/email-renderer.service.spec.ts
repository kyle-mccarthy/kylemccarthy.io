import { Test, TestingModule } from '@nestjs/testing';
import { JSDOM } from 'jsdom';
import { EmailRendererService } from './email-renderer.service';

describe('EmailRendererService', () => {
  let service: EmailRendererService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailRendererService],
    }).compile();
    service = module.get<EmailRendererService>(EmailRendererService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should render reset password', async () => {
    const { html, errors } = await service.render('forgotPassword', {
      name: 'John Doe',
      url: 'http://google.com',
    });

    expect(errors.length).toEqual(0);

    const dom = new JSDOM(html);
    const res = (dom.window as any).document.querySelectorAll(
      '.forgot-password',
    );

    expect(res['0']).toBeDefined();
  });
});
