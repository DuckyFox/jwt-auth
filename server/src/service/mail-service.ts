import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

class MailService {
    private transporter: Transporter | null = null;

    private getTransporter(): Transporter {
        if (this.transporter) {
            return this.transporter;
        }

        const mailHost = process.env.SMTP_HOST || 'smtp.yandex.ru';
        const mailPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
        const mailUser = process.env.SMTP_USER;
        const mailPassword = process.env.SMTP_PASSWORD;

        if (!mailHost || !mailUser || !mailPassword) {
            throw new Error(
                'SMTP credentials not configured. Check SMTP_HOST, SMTP_USER, SMTP_PASSWORD in .env'
            );
        }

        this.transporter = nodemailer.createTransport({
            host: mailHost,
            port: mailPort,
            secure: mailPort === 465,
            auth: {
                user: mailUser,
                pass: mailPassword
            }
        });

        return this.transporter;
    }

    async sendActivationMail(to: string, link: string) {
        const transporter = this.getTransporter();

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + (process.env.API_URL || 'localhost'),
            html: `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">ТЫК СЮДА</a>
                </div>
            `
        });
    }
}

export default new MailService();
