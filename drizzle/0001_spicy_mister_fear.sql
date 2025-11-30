CREATE TABLE `accounts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accountNumber` varchar(20) NOT NULL,
	`accountType` enum('checking','savings') NOT NULL,
	`balance` int NOT NULL DEFAULT 0,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`status` enum('active','frozen','closed') NOT NULL DEFAULT 'active',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `accounts_id` PRIMARY KEY(`id`),
	CONSTRAINT `accounts_accountNumber_unique` UNIQUE(`accountNumber`)
);
--> statement-breakpoint
CREATE TABLE `auditLogs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`action` varchar(100) NOT NULL,
	`entityType` varchar(50),
	`entityId` int,
	`ipAddress` varchar(45),
	`userAgent` text,
	`details` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `auditLogs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accountId` int NOT NULL,
	`cardNumber` varchar(16) NOT NULL,
	`cardType` enum('debit','atm') NOT NULL,
	`cvv` varchar(3) NOT NULL,
	`expiryDate` varchar(7) NOT NULL,
	`status` enum('requested','processing','shipped','active','blocked','expired') NOT NULL DEFAULT 'requested',
	`requestedAt` timestamp NOT NULL DEFAULT (now()),
	`activatedAt` timestamp,
	`shippedAt` timestamp,
	CONSTRAINT `cards_id` PRIMARY KEY(`id`),
	CONSTRAINT `cards_cardNumber_unique` UNIQUE(`cardNumber`)
);
--> statement-breakpoint
CREATE TABLE `kycDocuments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`documentType` enum('id','proof_of_address','selfie') NOT NULL,
	`documentUrl` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`rejectionReason` text,
	`uploadedAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`reviewedBy` int,
	CONSTRAINT `kycDocuments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loanRepayments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`loanId` int NOT NULL,
	`transactionId` int,
	`amount` int NOT NULL,
	`principalAmount` int NOT NULL,
	`interestAmount` int NOT NULL,
	`dueDate` timestamp NOT NULL,
	`paidAt` timestamp,
	`status` enum('scheduled','paid','overdue','missed') NOT NULL DEFAULT 'scheduled',
	CONSTRAINT `loanRepayments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `loans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`accountId` int NOT NULL,
	`amount` int NOT NULL,
	`interestRate` varchar(10) NOT NULL,
	`termMonths` int NOT NULL,
	`monthlyPayment` int NOT NULL,
	`totalRepayment` int NOT NULL,
	`remainingBalance` int NOT NULL,
	`status` enum('pending','approved','rejected','active','completed','defaulted') NOT NULL DEFAULT 'pending',
	`purpose` text,
	`rejectionReason` text,
	`appliedAt` timestamp NOT NULL DEFAULT (now()),
	`approvedAt` timestamp,
	`approvedBy` int,
	`disbursedAt` timestamp,
	`nextPaymentDue` timestamp,
	CONSTRAINT `loans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('transaction','login','security','loan','card','system') NOT NULL,
	`isRead` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `supportTickets` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`status` enum('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
	`priority` enum('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`resolvedAt` timestamp,
	`resolvedBy` int,
	CONSTRAINT `supportTickets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `systemSettings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`settingKey` varchar(100) NOT NULL,
	`settingValue` text NOT NULL,
	`description` text,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`updatedBy` int,
	CONSTRAINT `systemSettings_id` PRIMARY KEY(`id`),
	CONSTRAINT `systemSettings_settingKey_unique` UNIQUE(`settingKey`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fromAccountId` int,
	`toAccountId` int,
	`amount` int NOT NULL,
	`currency` varchar(3) NOT NULL DEFAULT 'USD',
	`transactionType` enum('transfer','deposit','withdrawal','loan_disbursement','loan_repayment','fee') NOT NULL,
	`status` enum('pending','completed','failed','cancelled') NOT NULL DEFAULT 'pending',
	`description` text,
	`reference` varchar(100),
	`swiftCode` varchar(11),
	`fee` int NOT NULL DEFAULT 0,
	`exchangeRate` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
