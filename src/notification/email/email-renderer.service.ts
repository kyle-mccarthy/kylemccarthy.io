import { Injectable } from '@nestjs/common';
import fs from 'fs';
import mjml2html from 'mjml';
import Mustache from 'mustache';
import path from 'path';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

interface RendererOptions {
  layout: string;
}

interface RenderedTemplate {
  html: string;
  errors: any[];
}

@Injectable()
export class EmailRendererService {
  private basePath: string;
  private options: RendererOptions;

  constructor(basePath: string) {
    this.basePath = basePath;
    this.options = this.mergeOptions({});
  }

  public async register(options: Partial<RendererOptions> = {}) {
    this.options = this.mergeOptions(options);
  }

  public async render(
    name: string,
    variables?: any,
  ): Promise<RenderedTemplate> {
    const filename = path.resolve(this.basePath, name);
    const template = await this.getTemplate(filename);
    const layout = await this.getTemplate(this.options.layout);

    if (!template) {
      throw new Error(`Template ${name} does not exist`);
    }

    const injectedHtml = this.injectParams(layout, variables, {
      content: template,
    });

    return mjml2html(injectedHtml);
  }

  public getDefaultOptions(): RendererOptions {
    return {
      layout: 'layout',
    };
  }

  protected async getTemplate(template: string) {
    const templatePath = path.resolve(this.basePath, `${template}.mjml`);
    const html = await readFile(templatePath, 'utf8');
    return html;
  }

  protected injectParams(html: string, variables?: any, partials?: any) {
    return Mustache.render(html, variables, partials);
  }

  private mergeOptions(options: Partial<RendererOptions> = {}) {
    return {
      ...this.getDefaultOptions(),
      ...options,
    };
  }
}
